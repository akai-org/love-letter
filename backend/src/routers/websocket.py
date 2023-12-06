from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from src.dependencies import game_manager as manager

router = APIRouter()


@router.websocket("/ws/{room_id}/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket, room_id: str, client_id: str
):
    try:
        await manager.connect(websocket, room_id, client_id)
        while True:
            data = await websocket.receive_text()
            await manager.handle_message(room_id, client_id, data)
    except WebSocketDisconnect:
        await manager.remove(websocket)
