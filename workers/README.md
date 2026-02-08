# Worker - instructions

This folder contains multiple worker scaffolds that hold secrets and perform AI/media/deploy tasks.

Available workers (local ports):
- `worker_app.py` (general worker) -> port 9000
- `ai_worker.py` (LLM / generation) -> port 9001
- `media_worker.py` (media processing) -> port 9002
- `deploy_worker.py` (build & deploy tasks) -> port 9003

Setup (local)

PowerShell:
```powershell
cd workers
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
# edit workers\.env and fill the real secrets locally (DO NOT commit)
python worker_app.py      # runs on 9000
python ai_worker.py       # runs on 9001
python media_worker.py    # runs on 9002
python deploy_worker.py   # runs on 9003
```

Notes:
- Each worker exposes internal endpoints under `/internal/*`.
- The Gateway should call workers over the internal network (docker-compose or private network). Do not expose worker ports publicly without a proxy + authentication.

