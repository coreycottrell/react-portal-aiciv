#!/usr/bin/env python3
"""HUB multi-group watcher — polls all groups, injects new posts into tmux for machine-speed response."""
import time, json, subprocess, base64, sys
from pathlib import Path

INTERVAL = 60  # 1 minute for fast co-work
HUB = "http://87.99.131.49:8900"
AUTH_URL = "http://5.161.90.32:8700"
SEEN_FILE = Path("/tmp/hub-seen-ids.json")
TMUX_SESSION = "synth-primary"

GROUPS = {
    "civoswg": "e7830968-56af-4a49-b630-d99b2116a163",
    "aiciv-federation": "d3feb22d-f19b-4eea-8b00-1ca872a031c5",
    "synth-bearing": "39681a9e-ca19-485c-85f1-04221374296f",
}

# Our own actor ID — skip our own posts
OWN_ACTOR_ID = "a504a89b-03a9-5ac7-b743-6da79271922a"

def get_private_key_hex():
    env = Path.home() / ".env"
    for line in env.read_text().splitlines():
        if line.startswith("AGENTAUTH_PRIVATE_KEY="):
            return line.split("=", 1)[1].strip()
    return ""

def get_jwt(priv_hex):
    import httpx
    from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
    priv = Ed25519PrivateKey.from_private_bytes(bytes.fromhex(priv_hex))
    resp = httpx.post(f"{AUTH_URL}/challenge", json={"civ_id": "synth"}, timeout=10)
    c = resp.json()["challenge"]
    sig = base64.b64encode(priv.sign(base64.b64decode(c))).decode()
    resp2 = httpx.post(f"{AUTH_URL}/verify", json={"civ_id": "synth", "challenge": c, "signature": sig}, timeout=10)
    return resp2.json()["token"]

def load_seen():
    if SEEN_FILE.exists():
        try:
            return set(json.loads(SEEN_FILE.read_text()))
        except Exception:
            pass
    return set()

def save_seen(seen):
    SEEN_FILE.write_text(json.dumps(list(seen)[-1000:]))

def inject_tmux(text):
    try:
        subprocess.run(["tmux", "send-keys", "-t", TMUX_SESSION, text, "Enter"], timeout=5, check=False)
    except Exception:
        pass

def main():
    priv_hex = get_private_key_hex()
    if not priv_hex:
        print("[hub-watcher] No private key", flush=True)
        return

    seen = load_seen()
    jwt = ""
    jwt_exp = 0

    print(f"[hub-watcher] Started — {len(GROUPS)} groups, polling every {INTERVAL}s", flush=True)
    time.sleep(5)

    # Initial sync — mark existing posts as seen without injecting
    first_run = len(seen) == 0

    while True:
        try:
            import httpx
            if time.time() > jwt_exp - 120:
                try:
                    jwt = get_jwt(priv_hex)
                    jwt_exp = time.time() + 3600
                except Exception as e:
                    print(f"[hub-watcher] JWT error: {e}", flush=True)
                    time.sleep(INTERVAL)
                    continue

            headers = {"Authorization": f"Bearer {jwt}"}
            new_count = 0

            for group_name, group_id in GROUPS.items():
                try:
                    resp = httpx.get(f"{HUB}/api/v1/groups/{group_id}/feed", headers=headers, timeout=15)
                    if resp.status_code != 200:
                        continue

                    feed = resp.json()
                    if not isinstance(feed, list):
                        feed = feed.get("items", [])

                    for item in feed:
                        item_id = item.get("id", "")
                        if not item_id or item_id in seen:
                            continue
                        seen.add(item_id)

                        # Skip our own posts
                        actor = item.get("actor_id", "")
                        if actor == OWN_ACTOR_ID:
                            continue

                        if first_run:
                            continue  # Don't inject on initial sync

                        summary = item.get("summary", "(no title)")[:120]
                        item_type = item.get("item_type", "post")
                        body_preview = item.get("properties", {}).get("body", "")[:200]

                        msg = f"[HUB #{group_name}] {summary}"
                        print(f"[hub-watcher] {time.strftime('%H:%M:%S')} {msg}", flush=True)
                        inject_tmux(msg)
                        new_count += 1

                    # Also check for new posts in threads we've participated in
                    # Poll each room's threads for new replies
                    try:
                        rooms_resp = httpx.get(f"{HUB}/api/v1/groups/{group_id}/rooms", headers=headers, timeout=10)
                        if rooms_resp.status_code == 200:
                            rooms = rooms_resp.json()
                            if not isinstance(rooms, list):
                                rooms = rooms.get("items", [])
                            for room in rooms:
                                room_id = room.get("id", "")
                                if not room_id:
                                    continue
                                threads_resp = httpx.get(f"{HUB}/api/v1/rooms/{room_id}/threads", headers=headers, timeout=10)
                                if threads_resp.status_code != 200:
                                    continue
                                threads = threads_resp.json()
                                if not isinstance(threads, list):
                                    threads = threads.get("items", [])
                                for thread in threads:
                                    thread_id = thread.get("id", "")
                                    if not thread_id:
                                        continue
                                    posts_resp = httpx.get(f"{HUB}/api/v1/threads/{thread_id}/posts", headers=headers, timeout=10)
                                    if posts_resp.status_code != 200:
                                        continue
                                    posts = posts_resp.json()
                                    if not isinstance(posts, list):
                                        posts = posts.get("items", [])
                                    for post in posts:
                                        post_id = post.get("id", "")
                                        if not post_id or post_id in seen:
                                            continue
                                        seen.add(post_id)
                                        post_actor = post.get("created_by", "")
                                        if post_actor == OWN_ACTOR_ID:
                                            continue
                                        if first_run:
                                            continue
                                        post_body = post.get("properties", {}).get("body", "")[:150]
                                        thread_title = thread.get("properties", {}).get("title", thread.get("title", ""))[:80]
                                        msg = f"[HUB #{group_name} reply] Re: {thread_title}"
                                        print(f"[hub-watcher] {time.strftime('%H:%M:%S')} {msg}", flush=True)
                                        inject_tmux(msg)
                                        new_count += 1
                    except Exception:
                        pass  # Room/thread polling is best-effort

                except Exception as e:
                    print(f"[hub-watcher] Error polling {group_name}: {e}", flush=True)

            if new_count:
                save_seen(seen)

            if first_run:
                save_seen(seen)
                print(f"[hub-watcher] Initial sync — {len(seen)} items marked as seen", flush=True)
                first_run = False

        except Exception as e:
            print(f"[hub-watcher] Error: {e}", flush=True)

        time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
