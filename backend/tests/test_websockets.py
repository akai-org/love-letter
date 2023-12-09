import pytest
from fastapi.testclient import TestClient
from fastapi.websockets import WebSocketDisconnect

from src.dependencies import get_manager
from src.game_manager import GameManager
from src.main import app


async def override_manager() -> GameManager:
    manager = GameManager()
    manager.add_new_game(max_players=2, room_name="foo", password=None)
    manager.add_new_game(max_players=2, room_name="bar", password="123")
    return manager


app.dependency_overrides[get_manager] = override_manager


@pytest.fixture(name="client")
def client_fixture():
    client = TestClient(app)
    yield client


@pytest.fixture(name="identity1")
def get_identity1():
    return {"action": {"type": "IDENTITY", "payload": ["imma_user"]}}


class TestWebsocketConnection:
    def test_connect_to_non_existing_room(
        self, client: TestClient, identity1: dict
    ):
        with pytest.raises(WebSocketDisconnect):
            with client.websocket_connect("/ws/dummy1") as ws:
                ws.send_json(identity1)
                ws.receive_json()

    def test_connect_using_wrong_password(
        self, client: TestClient, identity1: dict
    ):
        with pytest.raises(WebSocketDisconnect):
            with client.websocket_connect("/ws/bar/wrong_password") as ws:
                ws.send_json(identity1)
                ws.receive_json()

    def test_successfully_connect_to_existing_room_with_password(
        self, client: TestClient, identity1: dict
    ):
        with client.websocket_connect("/ws/bar/123") as ws:
            ws.send_json(identity1)
            ws.receive_json()

    def test_successfully_connect_to_existing_room_without_password(
        self, client: TestClient, identity1: dict
    ):
        with client.websocket_connect("/ws/foo") as ws:
            ws.send_json(identity1)
            ws.receive_json()
