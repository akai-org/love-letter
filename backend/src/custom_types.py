from enum import Enum


class GameStatus(Enum):
    NOT_STARTED = 0
    STARTED = 1
    TERMINATED = 2

    def __str__(self):
        return str(self.name).lower()
