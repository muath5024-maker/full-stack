FROM python:3.11-slim
WORKDIR /app
COPY ../../workers /app
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "ai_worker.py"]