from enum import Enum


class EventType(Enum):
    PLAYED = "PLAYED"
    KILLED = "KILLED"
    NO_ACTION = "NO_ACTION"
    ROUND_OVER = "ROUND_OVER"
    NEW_ROUND = "NEW_ROUND"
    GOT_POINT = "GOT_POINT"
    WINNER = "WINNER"
    TURN = "TURN"
    TIMEUP = "TIMEUP"
    YOUR_TURN = "YOUR_TURN"
    NEW_CARD = "NEW_CARD"
    SHOW_CARD = "SHOW_CARD"
    REMOVE_CARD = "REMOVE_CARD"
    PROTECTED = "PROTECTED"
    AUTOPLAYED = "AUTOPLAYED"
    PLAY_ACCEPTED = "PLAY_ACCEPTED"
    PLAY_REJECTED = "PLAY_REJECTED"


class Event:
    def __init__(
        self,
        event_type: EventType,
        payload: list[str],
        recipient: str = "__all__",
    ):
        self.event_type = event_type
        self.payload = payload
        self.recipient = recipient

    def to_dict(self) -> dict:
        res = dict()
        res["recipient"] = self.recipient
        res["event_type"] = self.event_type
        res["payload"] = self.payload
        return res
