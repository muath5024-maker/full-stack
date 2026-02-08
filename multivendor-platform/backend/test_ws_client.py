import asyncio
import websockets

async def run():
    uri = "ws://localhost:8000/ws/chat"
    try:
        async with websockets.connect(uri) as ws:
            await ws.send("مرحبا من عميل الاختبار")
            resp = await ws.recv()
            print("Received:", resp)
    except Exception as e:
        print("Connection failed:", e)

if __name__ == '__main__':
    asyncio.run(run())
