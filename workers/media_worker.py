"""
Media Worker scaffold - handles image/video processing tasks.
Listens on port 9002.
"""
import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = FastAPI(title="Media Worker")


@app.get('/health')
def health():
    return {'status': 'ok', 'worker': 'media'}


@app.post('/internal/media/process')
async def process(file: UploadFile = File(...)):
    # Placeholder: save file, enqueue processing job, return job id
    content = await file.read()
    size = len(content)
    return {'filename': file.filename, 'size': size, 'status': 'queued'}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('workers.media_worker:app', host='0.0.0.0', port=9002, reload=True)
