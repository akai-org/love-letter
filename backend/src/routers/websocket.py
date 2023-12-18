from typing import Annotated

from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect

from src.dependencies import get_manager
from src.game_manager import GameManager

router = APIRouter()


@router.websocket("/ws/{room_name}")
@router.websocket("/ws/{room_name}/{password}")
async def websocket_endpoint(
    websocket: WebSocket,
    manager: Annotated[GameManager, Depends(get_manager)],
):
    room_name = websocket.path_params["room_name"]
    password = websocket.path_params.get("password", None)

    try:
        await manager.connect(websocket, room_name, password)
        client_id = websocket.scope["client_id"]
        while True:
            data = await websocket.receive_json()
            await manager.handle_message(room_name, client_id, data)
    except WebSocketDisconnect:
        await manager.disconnect(websocket)
