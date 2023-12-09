import pytest
from fastapi.testclient import TestClient
from fastapi.websockets import WebSocketDisconnect

from src.dependencies import get_manager
from src.game_manager import GameManager
from src.main import app


async def override_manager() -> GameManager:
    try:
        yield override_manager.manager
    except AttributeError:
        manager = GameManager()
        manager.add_new_game(max_players=2, room_name="foo", password=None)
        manager.add_new_game(max_players=2, room_name="bar", password="123")
        override_manager.manager = manager
        yield override_manager.manager


app.dependency_overrides[get_manager] = override_manager


@pytest.fixture(name="client")
def client_fixture():
    yield TestClient(app)


@pytest.fixture(name="identity")
def single_identity_fixture():
    return {"action": {"type": "IDENTITY", "payload": ["imma_user"]}}


@pytest.fixture(name="identities")
def multiple_identities_fixture():
    return [
        {"action": {"type": "IDENTITY", "payload": ["alpha"]}},
        {"action": {"type": "IDENTITY", "payload": ["beta"]}},
        {"action": {"type": "IDENTITY", "payload": ["gamma"]}},
    ]


class TestWebsocketConnection:
    def test_connect_to_non_existing_room(
        self, client: TestClient, identity: dict
    ):
        with pytest.raises(WebSocketDisconnect):
            with client.websocket_connect("/ws/dummy1") as ws:
                ws.send_json(identity)
                ws.receive_json()

    def test_connect_using_wrong_password(
        self, client: TestClient, identity: dict
    ):
        with pytest.raises(WebSocketDisconnect):
            with client.websocket_connect("/ws/bar/wrong_password") as ws:
                ws.send_json(identity)
                ws.receive_json()

    def test_successfully_connect_to_existing_room_with_password(
        self, client: TestClient, identity: dict
    ):
        with client.websocket_connect("/ws/bar/123") as ws:
            ws.send_json(identity)
            ws.receive_json()

    def test_successfully_connect_to_existing_room_without_password(
        self, client: TestClient, identity: dict
    ):
        with client.websocket_connect("/ws/foo") as ws:
            ws.send_json(identity)
            ws.receive_json()

    def test_two_same_identities(self, client: TestClient, identity: dict):
        URL = "/ws/foo"
        with (
            client.websocket_connect(URL) as ws1,
            client.websocket_connect(URL) as ws2,
        ):
            ws1.send_json(identity)
            with pytest.raises(WebSocketDisconnect):
                ws2.send_json(identity)
                ws2.receive_json()

    def test_connect_more_than_allowed_connections_to_the_same_room(
        self, client: TestClient, identities: list[dict]
    ):
        URL = "/ws/foo"
        with (
            client.websocket_connect(URL) as ws1,
            client.websocket_connect(URL) as ws2,
            client.websocket_connect(URL) as ws3,
        ):
            ws1.send_json(identities[0])
            ws2.send_json(identities[1])
            with pytest.raises(WebSocketDisconnect):
                ws3.send_json(identities[2])
                ws3.receive_json()
