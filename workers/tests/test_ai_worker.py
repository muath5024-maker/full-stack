import pytest
from httpx import AsyncClient

from workers import ai_worker


@pytest.mark.asyncio
async def test_generate_with_groq_and_crewai(monkeypatch):
    # Mock groq client query
    class DummyGroq:
        def query(self, q):
            return {'result': 'groq-context', 'query': q}

    monkeypatch.setattr(ai_worker, 'groq_client', DummyGroq())

    # Mock generate_with_crewai to return deterministic value
    async def fake_generate(prompt, options):
        return {'text': 'generated:' + prompt}

    monkeypatch.setattr(ai_worker, 'generate_with_crewai', fake_generate)

    app = ai_worker.app
    async with AsyncClient(app=app, base_url='http://test') as ac:
        payload = {'prompt': 'Hello', 'groq_query': '*[_type=="product"]'}
        r = await ac.post('/internal/ai/generate', json=payload)
        assert r.status_code == 200
        data = r.json()
        assert 'prompt' in data and data['prompt'] == 'Hello'
        assert 'context' in data and 'groq-context' in data['context']
        assert 'result' in data
        # result is whatever fake_generate returned
        assert data['result'] == {'text': 'generated:' + data['prompt']}
