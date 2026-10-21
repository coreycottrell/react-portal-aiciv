"""Reconnect signal on /api/auth/status (t3775).

The status now also says whether the owner should be offered "Reconnect Claude":
  refreshable      - the saved credential carries a non-empty refresh token
  reconnect_needed - signed out, OR signed in on a credential that cannot renew

Nothing here may press a key or signal a process (same guard as t3383).
"""
import importlib
import json
import os
import subprocess
import sys
import time

import pytest
from starlette.testclient import TestClient

TOKEN = "test-token"
H = {"Authorization": f"Bearer {TOKEN}"}


@pytest.fixture()
def portal(tmp_path, monkeypatch):
    home = tmp_path / "home"
    (home / "config").mkdir(parents=True)
    (home / ".claude").mkdir(parents=True)
    monkeypatch.setenv("HOME", str(home))
    monkeypatch.setenv("CIV_ROOT", str(home))
    monkeypatch.delenv("TRIAL_CONFIG_PATH", raising=False)
    monkeypatch.delenv("PORTAL_ENGINE_MANAGED", raising=False)
    monkeypatch.setenv("PORTAL_TOKEN_FILE", str(tmp_path / "token"))
    (tmp_path / "token").write_text(TOKEN)
    sys.modules.pop("portal_server", None)
    mod = importlib.import_module("portal_server")
    getattr(mod, "_auth_turn_cache", {}).clear()
    if hasattr(mod, "_claude_processes_sync"):
        mod._claude_processes_sync_orig = mod._claude_processes_sync
        # Tests never see the host's real Claude processes unless they ask.
        mod._claude_processes_sync = lambda: []

    typed = []
    real_run = subprocess.run

    def guarded_run(cmd, *a, **kw):
        flat = " ".join(map(str, cmd)) if isinstance(cmd, (list, tuple)) else str(cmd)
        if "send-keys" in flat or "pkill" in flat or flat.startswith("kill"):
            typed.append(flat)
            raise AssertionError(f"auth status/reconnect must not type or kill: {flat}")
        if isinstance(cmd, (list, tuple)) and cmd and cmd[0] == "tmux":
            # Never reach a real tmux server from tests: pretend no session.
            return subprocess.CompletedProcess(cmd, 1, "", "no server running on /tmp/tmux-test/default")
        return real_run(cmd, *a, **kw)

    monkeypatch.setattr(mod.subprocess, "run", guarded_run)
    monkeypatch.setattr(os, "kill", lambda *a, **k: (_ for _ in ()).throw(AssertionError("os.kill called")))
    return mod, home, typed


def _creds(home, **oauth):
    (home / ".claude" / ".credentials.json").write_text(json.dumps({"claudeAiOauth": oauth}))


def _now_ms():
    return int(time.time() * 1000)


def _status(mod):
    return TestClient(mod.app).get("/api/auth/status", headers=H).json()


def test_signed_in_with_refresh_token_needs_no_reconnect(portal):
    mod, home, typed = portal
    _creds(home, accessToken="a", refreshToken="r", expiresAt=_now_ms() + 3600_000)
    s = _status(mod)
    assert s["authenticated"] is True
    assert s["refreshable"] is True and s["reconnect_needed"] is False
    assert typed == []


def test_signed_out_no_credentials_needs_reconnect(portal):
    mod, home, typed = portal
    s = _status(mod)
    assert s["authenticated"] is False
    assert s["refreshable"] is False and s["reconnect_needed"] is True
    assert typed == []


def test_expired_token_with_refresh_token_but_signed_out_needs_reconnect(portal):
    mod, home, _ = portal
    _creds(home, accessToken="a", refreshToken="r", expiresAt=_now_ms() - 3 * 3600_000)
    s = _status(mod)
    assert s["authenticated"] is False
    assert s["refreshable"] is True and s["reconnect_needed"] is True


def test_valid_token_without_refresh_token_is_signed_in_but_needs_reconnect(portal):
    mod, home, _ = portal
    _creds(home, accessToken="a", expiresAt=_now_ms() + 3600_000)
    s = _status(mod)
    assert s["authenticated"] is True
    assert s["refreshable"] is False and s["reconnect_needed"] is True


@pytest.mark.parametrize("refresh", ["", None, 0, ["r"]])
def test_empty_or_wrong_typed_refresh_token_is_not_refreshable(portal, refresh):
    mod, home, _ = portal
    _creds(home, accessToken="a", refreshToken=refresh, expiresAt=_now_ms() + 3600_000)
    s = _status(mod)
    assert s["refreshable"] is False and s["reconnect_needed"] is True


def test_unreadable_credentials_file_needs_reconnect_without_crashing(portal):
    mod, home, _ = portal
    (home / ".claude" / ".credentials.json").write_text("{not json")
    s = _status(mod)
    assert s["authenticated"] is False
    assert s["refreshable"] is False and s["reconnect_needed"] is True


def test_managed_engine_never_asks_to_reconnect(portal, monkeypatch):
    mod, home, _ = portal
    monkeypatch.setenv("PORTAL_ENGINE_MANAGED", "1")
    s = _status(mod)
    assert s["managed"] is True
    assert "reconnect_needed" not in s and "refreshable" not in s


def test_status_read_never_touches_credentials_file(portal):
    mod, home, typed = portal
    _creds(home, accessToken="a", refreshToken="r", expiresAt=_now_ms() + 3600_000)
    f = home / ".claude" / ".credentials.json"
    before = (f.read_bytes(), f.stat().st_mtime_ns)
    _status(mod)
    _status(mod)
    assert (f.read_bytes(), f.stat().st_mtime_ns) == before
    assert not list((home / ".claude").glob(".credentials.json.*"))
    assert typed == []
