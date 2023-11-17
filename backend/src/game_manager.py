from collections import defaultdict

from fastapi import WebSocket
from game import Game


class GameManager:
    """
    Manages games sessions
    """

    def __init__(self):
        self.connections: dict = defaultdict(dict)
        self.games: dict = defaultdict(dict)

    async def connect(
        self, websocket: WebSocket, room_name: str, client_id: int
    ):
        await websocket.accept()
        if (
            self.connections[room_name] == {}
            or len(self.connections[room_name]) == 0
        ):
            self.connections[room_name] = []
            # TODO: Support for any number of players
            self.games[room_name] = Game(4)
        websocket.scope["room_name"] = room_name
        websocket.scope["client_id"] = client_id
        self.connections[room_name].append(websocket)

    async def handle_message(
        self, creator_id: int, room_name: str, message: str
    ):
        game: Game = self.games[room_name]
        websockets: list[WebSocket] = self.connections[room_name]

        for ws in websockets:
            if creator_id == ws.scope["user_id"]:
                pass
            ws.send_json({"data": message})

    def get_members(self, room_name):
        try:
            return self.connections[room_name]
        except Exception:
            return None

    def remove(self, websocket: WebSocket, room_name: str):
        self.connections[room_name].remove(websocket)
