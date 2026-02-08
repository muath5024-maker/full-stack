import os
import sys
import pytest
from fastapi.testclient import TestClient
import httpx

# Ensure tests import the local backend `app` package before any top-level `app` package
backend_root = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, backend_root)

# Ensure minimal env for app startup during tests
os.environ.setdefault("SUPABASE_URL", "http://localhost:5432")
os.environ.setdefault("SUPABASE_KEY", "test")
os.environ.setdefault("SUPABASE_SERVICE_KEY", "test")
os.environ.setdefault("REDIS_URL", "redis://localhost:6379")

from app.main import app

client = TestClient(app)


@pytest.mark.asyncio
async def test_ai_generate_success(monkeypatch):
    async def fake_post(self, url, json):
        class Resp:
            def raise_for_status(self):
                return None

            def json(self):
                return {"mock": "ok", "echo": json}

        return Resp()

    monkeypatch.setattr(httpx.AsyncClient, "post", fake_post)

    resp = client.post("/api/ai/generate", json={"prompt": "اختبار"})
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("mock") == "ok"


@pytest.mark.asyncio
async def test_ai_generate_worker_error(monkeypatch):
    async def fake_post_raise(self, url, json):
        raise httpx.HTTPError("worker failure")

    monkeypatch.setattr(httpx.AsyncClient, "post", fake_post_raise)

    resp = client.post("/api/ai/generate", json={"prompt": "اختبار"})
    assert resp.status_code == 502
    assert "Worker error" in resp.json().get("detail", "")
