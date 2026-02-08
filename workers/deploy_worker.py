"""
Deploy Worker scaffold - handles build and deployment tasks.
Listens on port 9003.
"""
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = FastAPI(title="Deploy Worker")


class DeployRequest(BaseModel):
    repo_url: str
    ref: str = 'main'


@app.get('/health')
def health():
    return {'status': 'ok', 'worker': 'deploy'}


@app.post('/internal/deploy/run')
async def run_deploy(req: DeployRequest):
    # Placeholder: clone repo, build, push, or trigger deployment pipeline
    return {'repo': req.repo_url, 'ref': req.ref, 'status': 'started'}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('workers.deploy_worker:app', host='0.0.0.0', port=9003, reload=True)
