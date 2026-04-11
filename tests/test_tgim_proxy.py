"""Tests for the TGIM proxy scaffolding in portal_server.py.

Covers:
  - Helper functions (_tgim_headers, _tgim_upstream_url)
  - Route dispatching + auth enforcement
  - Service-key / user-email header injection
  - Method + query-param + JSON body forwarding
  - Upstream error / timeout handling

These tests intentionally avoid hitting the real TGIM backend. Instead they
monkeypatch ``portal_server.httpx.AsyncClient`` with a fake client that
records every outbound request and returns canned responses, so the proxy can
be exercised end-to-end through Starlette's TestClient without network I/O.

Run with:
    python3 -m pytest tests/test_tgim_proxy.py -v
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path
from typing import Any

import pytest


# ---------------------------------------------------------------------------
# portal_server import shim
# ---------------------------------------------------------------------------
# portal_server.py is a top-level module in the repo (not a package), so we
# load it by file path. This keeps the tests runnable from any cwd and avoids
# polluting sys.path.
REPO_ROOT = Path(__file__).resolve().parent.parent
PORTAL_PATH = REPO_ROOT / "portal_server.py"


def _load_portal_server():
    if "portal_server" in sys.modules:
        return sys.modules["portal_server"]
    spec = importlib.util.spec_from_file_location("portal_server", PORTAL_PATH)
    assert spec and spec.loader, f"failed to load spec for {PORTAL_PATH}"
    mod = importlib.util.module_from_spec(spec)
    sys.modules["portal_server"] = mod
    spec.loader.exec_module(mod)
    return mod


portal_server = _load_portal_server()


# ---------------------------------------------------------------------------
# Fake httpx.AsyncClient
# ---------------------------------------------------------------------------
class FakeResponse:
    def __init__(self, status_code: int = 200, json_body: Any = None, text: str = ""):
        self.status_code = status_code
        self._json = json_body if json_body is not None else {"ok": True}
        self.text = text or "fake response text"

    def json(self) -> Any:
        return self._json


class FakeAsyncClient:
    """Drop-in replacement for httpx.AsyncClient used by the proxy.

    Records every outbound request into ``FakeAsyncClient.last_calls`` and
    returns whatever response the test configured in ``FakeAsyncClient.response``.
    """

    # class-level state so tests can inspect it after the call
    last_calls: list[dict] = []
    response: FakeResponse = FakeResponse()
    raise_exc: Exception | None = None

    def __init__(self, *args, **kwargs):
        self.init_kwargs = kwargs

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def request(self, method: str, url: str, headers=None, params=None, json=None, **_):
        FakeAsyncClient.last_calls.append(
            {
                "method": method,
                "url": url,
                "headers": headers or {},
                "params": dict(params or {}),
                "json": json,
            }
        )
        if FakeAsyncClient.raise_exc is not None:
            raise FakeAsyncClient.raise_exc
        return FakeAsyncClient.response


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------
@pytest.fixture(autouse=True)
def _reset_fake_client(monkeypatch):
    """Reset FakeAsyncClient state and patch portal_server.httpx.AsyncClient."""
    FakeAsyncClient.last_calls = []
    FakeAsyncClient.response = FakeResponse(
        status_code=200, json_body={"ok": True, "data": {"source": "fake-upstream"}}
    )
    FakeAsyncClient.raise_exc = None
    monkeypatch.setattr(portal_server.httpx, "AsyncClient", FakeAsyncClient)
    # Ensure the service key is set so proxy doesn't short-circuit with 503
    monkeypatch.setattr(portal_server, "TGIM_SERVICE_KEY", "test-service-key-123")
    monkeypatch.setattr(portal_server, "TGIM_BACKEND_URL", "http://backend.test:8089")
    monkeypatch.setattr(
        portal_server, "TGIM_DEFAULT_USER_EMAIL", "tester@puretechnology.nyc"
    )
    yield


@pytest.fixture
def client():
    """Starlette TestClient bound to the real portal app."""
    from starlette.testclient import TestClient

    return TestClient(portal_server.app)


@pytest.fixture
def auth_headers():
    return {"Authorization": f"Bearer {portal_server.BEARER_TOKEN}"}


# ---------------------------------------------------------------------------
# Helper-level tests (no route dispatch)
# ---------------------------------------------------------------------------
class TestTgimHelpers:
    def test_tgim_headers_contain_service_key(self):
        headers = portal_server._tgim_headers("alex@example.com")
        assert headers["X-TGIM-Service-Key"] == "test-service-key-123"

    def test_tgim_headers_contain_user_email(self):
        headers = portal_server._tgim_headers("alex@example.com")
        assert headers["X-TGIM-User"] == "alex@example.com"

    def test_tgim_headers_fall_back_to_default_email(self):
        headers = portal_server._tgim_headers(None)
        assert headers["X-TGIM-User"] == "tester@puretechnology.nyc"

    def test_tgim_headers_content_type_json(self):
        headers = portal_server._tgim_headers()
        assert headers["Content-Type"] == "application/json"

    def test_upstream_url_strips_prefix(self):
        url = portal_server._tgim_upstream_url("/api/tgim/briefing/schedule")
        assert url == "http://backend.test:8089/api/v1/briefing/schedule"

    def test_upstream_url_handles_deep_paths(self):
        url = portal_server._tgim_upstream_url("/api/tgim/oacs/user-settings/me")
        assert url == "http://backend.test:8089/api/v1/oacs/user-settings/me"

    def test_upstream_url_handles_bare_prefix(self):
        # /api/tgim (no trailing slash) should still produce a valid url
        url = portal_server._tgim_upstream_url("/api/tgim")
        assert url.startswith("http://backend.test:8089/api/v1/")


# ---------------------------------------------------------------------------
# Route-level tests (through Starlette TestClient)
# ---------------------------------------------------------------------------
class TestTgimProxyRoute:
    def test_proxy_requires_portal_auth(self, client):
        """Requests without a portal Bearer token return 401."""
        resp = client.get("/api/tgim/briefing/schedule")
        assert resp.status_code == 401
        # proxy should short-circuit before making an upstream call
        assert FakeAsyncClient.last_calls == []

    def test_proxy_forwards_get_request(self, client, auth_headers):
        """GET /api/tgim/briefing/schedule proxies to backend /api/v1/briefing/schedule."""
        resp = client.get("/api/tgim/briefing/schedule", headers=auth_headers)
        assert resp.status_code == 200
        assert len(FakeAsyncClient.last_calls) == 1
        call = FakeAsyncClient.last_calls[0]
        assert call["method"] == "GET"
        assert call["url"] == "http://backend.test:8089/api/v1/briefing/schedule"

    def test_proxy_strips_api_tgim_prefix_on_deep_paths(self, client, auth_headers):
        """Path segments after /api/tgim/ are preserved on the upstream URL."""
        resp = client.get("/api/tgim/oacs/user-settings/me", headers=auth_headers)
        assert resp.status_code == 200
        call = FakeAsyncClient.last_calls[0]
        assert call["url"] == "http://backend.test:8089/api/v1/oacs/user-settings/me"

    def test_proxy_injects_service_key_header(self, client, auth_headers):
        """X-TGIM-Service-Key header is present on upstream request."""
        client.get("/api/tgim/briefing/schedule", headers=auth_headers)
        call = FakeAsyncClient.last_calls[0]
        assert call["headers"].get("X-TGIM-Service-Key") == "test-service-key-123"

    def test_proxy_injects_user_email_header(self, client, auth_headers):
        """X-TGIM-User header is present on upstream request."""
        client.get("/api/tgim/briefing/schedule", headers=auth_headers)
        call = FakeAsyncClient.last_calls[0]
        assert call["headers"].get("X-TGIM-User") == "tester@puretechnology.nyc"

    def test_proxy_passes_query_params(self, client, auth_headers):
        """Query parameters are forwarded to the upstream."""
        resp = client.get(
            "/api/tgim/briefing/schedule?window=7d&team=ops", headers=auth_headers
        )
        assert resp.status_code == 200
        call = FakeAsyncClient.last_calls[0]
        assert call["params"] == {"window": "7d", "team": "ops"}

    def test_proxy_forwards_post_body(self, client, auth_headers):
        """POST /api/tgim/* forwards JSON body to upstream."""
        FakeAsyncClient.response = FakeResponse(
            status_code=201, json_body={"ok": True, "id": "xyz"}
        )
        payload = {"title": "test", "value": 42}
        resp = client.post(
            "/api/tgim/briefing/create",
            headers={**auth_headers, "Content-Type": "application/json"},
            json=payload,
        )
        assert resp.status_code == 201
        call = FakeAsyncClient.last_calls[0]
        assert call["method"] == "POST"
        assert call["json"] == payload

    def test_proxy_handles_upstream_500(self, client, auth_headers):
        """Upstream 500 passes through as 500."""
        FakeAsyncClient.response = FakeResponse(
            status_code=500, json_body={"error": "boom"}
        )
        resp = client.get("/api/tgim/briefing/schedule", headers=auth_headers)
        assert resp.status_code == 500

    def test_proxy_handles_upstream_timeout(self, client, auth_headers):
        """Upstream timeout returns 504 gateway timeout."""
        import httpx as _httpx

        FakeAsyncClient.raise_exc = _httpx.TimeoutException("timed out")
        resp = client.get("/api/tgim/briefing/schedule", headers=auth_headers)
        assert resp.status_code == 504

    def test_proxy_handles_generic_upstream_error(self, client, auth_headers):
        """Generic connection errors return 502."""
        FakeAsyncClient.raise_exc = RuntimeError("dns failure")
        resp = client.get("/api/tgim/briefing/schedule", headers=auth_headers)
        assert resp.status_code == 502

    def test_proxy_returns_503_when_service_key_missing(
        self, client, auth_headers, monkeypatch
    ):
        """If TGIM_SERVICE_KEY is not configured, proxy returns 503."""
        monkeypatch.setattr(portal_server, "TGIM_SERVICE_KEY", "")
        resp = client.get("/api/tgim/briefing/schedule", headers=auth_headers)
        assert resp.status_code == 503
        assert FakeAsyncClient.last_calls == []
