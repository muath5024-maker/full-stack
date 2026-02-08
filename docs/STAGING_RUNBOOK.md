## Staging Runbook

Purpose: explain how CI deploys the staging environment and required environment variables.

1) How CI deploys staging
  - The GitHub Actions workflow `.github/workflows/ci.yml` runs tests, then on `main` it runs the `staging-deploy` job which executes:
    - `docker compose -f docker-compose.yml up -d --build` inside `multivendor-platform`.

2) Required environment variables for staging
  - Create a `workers/.env` file (do NOT commit it). The file must include at minimum:
    - `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_KEY`
    - `GROQ_API_KEY` (if using Groq), `GROQ_PROJECT_ID`, `GROQ_DATASET`
    - `CREWAI_API_KEY`, `CREWAI_API_URL`
    - `WORKER_INTERNAL_KEY` (shared secret used by Gateway to authenticate requests to Workers)
    - `DB_*` connection values if not using Supabase
    - `MINIO_*` / `AWS_*` credentials for storage

3) Local staging testing
  - To run staging locally (simulates CI), copy `workers/.env.example` → `workers/.env` and fill credentials.
  - From repository root run:
```bash
cd multivendor-platform
docker compose up -d --build
```
  - After startup:
    - Gateway FastAPI should be on port defined in docker-compose (check compose file).
    - Workers (AI) will be available on the internal network; Gateway proxies to them.

4) Rolling updates and healthchecks
  - Ensure each service exposes a `/health` endpoint (`/health`) for readiness checks.
  - To roll update a single service locally:
```bash
docker compose up -d --build service-name
```

5) Security notes
  - Keep `workers/.env` secret and store real secrets in your cloud provider's secret store for CI (e.g., GitHub Actions secrets), and pass them to the deployment step.
  - Consider using an SSH runner or deploy key with limited permissions for production deployments.

6) Troubleshooting
  - If Gateway fails to contact a worker, check Docker network and service names in `docker-compose.yml`.
  - Check service logs:
```bash
docker compose logs -f service-name
```
