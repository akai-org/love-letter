from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from game_manager import GameManager

router = APIRouter()
manager = GameManager()


@router.websocket("/ws/{room_id}/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket, room_id: str, client_id: str
):
    await manager.connect(websocket, room_id, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.handle_message(room_id, client_id, data)
    except WebSocketDisconnect:
        await websocket.close()
