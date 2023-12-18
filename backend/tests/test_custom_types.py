from src.custom_types import GameStatus


class TestGameStatusToString:
    status = None

    def test_not_started_str(self):
        assert str(GameStatus.NOT_STARTED) == "not_started"

    def test_started_str(self):
        assert str(GameStatus.STARTED) == "started"

    def test_terminated_str(self):
        assert str(GameStatus.TERMINATED) == "terminated"
