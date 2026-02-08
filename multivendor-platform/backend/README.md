# Backend - multivendor-platform

Quick instructions to run the FastAPI test server and a small WebSocket client for development.

Prerequisites
- Python 3.11+
- Git
- (Optional) Docker for other services (Supabase/local)

Create venv and install

Windows (PowerShell):
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Run the server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

WebSocket endpoint
- Endpoint present in `app/main.py`: `/ws/chat`

Test WebSocket client (Python)

You can run the included `test_ws_client.py` to connect and send a test message:

```powershell
python test_ws_client.py
```

Security note
- Remove any real API keys from committed `.env` files. Keep secrets out of the repository and use environment variables or a secrets manager. Consider adding `.env` to `.gitignore` and commit a `.env.example` without secrets.
