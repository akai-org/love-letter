from collections import defaultdict

from fastapi import WebSocket, WebSocketDisconnect

from src.custom_types import GameStatus
from src.core.game import Game


class GameManager:
    """
    Manages games sessions
    """

    def __init__(self):
        self.connections: dict[str, list[WebSocket]] = defaultdict(dict)
        self.games: dict[str, Game] = defaultdict(dict)

    async def connect(
        self, websocket: WebSocket, room_name: str, password: str | None
    ) -> None:
        await websocket.accept()

        game: Game = self.games.get(room_name, None)
        if game is None:
            raise WebSocketDisconnect

        data = await websocket.receive_json()
        self._authenticate_user(websocket, data)
        client_id = websocket.scope["client_id"]

        match game.status:
            case GameStatus.NOT_STARTED:
                try:
                    game.add_new_player(client_id, password)
                    if self._should_start_the_game(game, room_name):
                        game.start_game()
                except ValueError:
                    raise WebSocketDisconnect
            case GameStatus.STARTED:
                if not self._is_player_reconnecting(client_id, game):
                    raise WebSocketDisconnect
            case GameStatus.TERMINATED:
                raise WebSocketDisconnect

        await websocket.send_json(game.to_dict())

        websocket.scope["room_name"] = room_name
        websocket.scope["client_id"] = client_id
        self.connections[room_name].append(websocket)

    async def handle_message(
        self, creator_id: int, room_name: str, message: str
    ) -> None:
        game: Game = self.games[room_name]
        websockets: list[WebSocket] = self.connections[room_name]

        for ws in websockets:
            if creator_id == ws.scope["user_id"]:
                pass
            ws.send_json({"data": message})

    def add_new_game(
        self, max_players: int, room_name: str, password: str | None
    ) -> None:
        if room_name in self.games:
            raise ValueError(
                f"Game with the name {room_name} was already created"
            )
        if max_players not in range(2, 7):
            raise ValueError(
                f"Invalid number of players: should be within [2-6]"
            )
        game: Game = Game(max_players, room_name, password)
        self.games[room_name] = game
        self.connections[room_name] = []

    def get_members(self, room_name):
        try:
            return self.connections[room_name]
        except Exception:
            return None

    async def disconnect(self, websocket: WebSocket) -> None:
        try:
            self.connections[room_name].remove(websocket)
            client_name = websocket.scope["client_id"]
            room_name = websocket.scope["room_name"]
            game: Game = self.games[room_name]
            game.remove_player(client_name)
        except (ValueError, KeyError, UnboundLocalError):
            pass
        finally:
            await websocket.close()

    def _authenticate_user(self, websocket: WebSocket, data: dict):
        """
        Fetches JSON in the format
        {
            "action": {
                "type": "IDENTITY",
                "payload": [<userId>]
            }
        }
        then applies websocket.scope['client_id'] = <userId>
        """
        action = data.get("action", None)
        if action is None:
            raise WebSocketDisconnect

        action_type = str(action.get("type", "")).upper()
        if action_type != "IDENTITY":
            raise WebSocketDisconnect

        payload = action.get("payload", None)
        if type(payload) is not list or len(payload) != 1:
            raise WebSocketDisconnect

        websocket.scope["client_id"] = payload[0]

    def _is_player_reconnecting(self, client_id: str, game: Game) -> bool:
        return game.does_player_exist(client_id)

    # TODO: Support for ready/unready
    def _should_start_the_game(self, game: Game, room_name: str) -> bool:
        num_connections = len(self.connections[room_name])
        num_max_players = game.max_players

        return (
            num_connections == num_max_players
            and game.status == GameStatus.NOT_STARTED
        )
