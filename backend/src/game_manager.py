from collections import defaultdict

from fastapi import WebSocket, WebSocketDisconnect

from src.custom_types import GameStatus
from src.game import Game


class GameManager:
    """
    Manages games sessions
    """

    def __init__(self):
        self.connections: dict[str, list[WebSocket]] = defaultdict(dict)
        self.games: dict[str, Game] = defaultdict(dict)

    async def connect(
        self, websocket: WebSocket, room_name: str, client_id: str
    ) -> None:
        await websocket.accept()

        if self.connections[room_name] == {}:
            self.connections[room_name] = []
            # TODO: Support for any number of players, not only four
            self.games[room_name] = Game(4, room_name)

        game: Game = self.games[room_name]

        should_ws_be_closed = False
        match game.status:
            case GameStatus.NOT_STARTED:
                try:
                    game.add_new_player(client_id)
                    if self._should_start_the_game(game, room_name):
                        game.start_game()
                except ValueError:
                    should_ws_be_closed = True
            case GameStatus.STARTED:
                if game.does_player_exist(client_id) == False:
                    should_ws_be_closed = True
            case GameStatus.TERMINATED:
                should_ws_be_closed = True

        if should_ws_be_closed:
            raise WebSocketDisconnect

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

    def get_members(self, room_name):
        try:
            return self.connections[room_name]
        except Exception:
            return None

    async def remove(self, websocket: WebSocket) -> None:
        try:
            client_name = websocket.scope["client_id"]
            room_name = websocket.scope["room_name"]
            game: Game = self.games[room_name]
            game.remove_player(client_name)
            self.connections[room_name].remove(websocket)
        except (ValueError, KeyError):
            pass
        finally:
            await websocket.close()

    # TODO: Support for ready/unready
    def _should_start_the_game(self, game: Game, room_name: str) -> bool:
        num_connections = len(self.connections[room_name])
        num_max_players = game.max_players

        return (
            num_connections == num_max_players
            and game.status == GameStatus.NOT_STARTED
        )
