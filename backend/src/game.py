from enum import IntEnum


class Card(IntEnum):
    ZERO_SPY = 0
    ONE_GUARD = 1
    TWO_PRIEST = 2
    THREE_BARON = 3
    FOUR_HANDMAID = 4
    FIVE_PRINCE = 5
    SIX_CHANCELLOR = 6
    SEVEN_KING = 7
    EIGHT_COUNTLESS = 8
    NINE_PRINCESS = 9


class Player:
    def __init__(self):
        self._deck = []
        self._rejected = []
        self.is_killed = False
        self.can_be_chosen = True
        self.points = 0

    def increment_score(self):
        self.points += 1

    def prepare_for_new_round(self):
        self._deck = []
        self._played_cards = []
        self.is_killed = False
        self.can_be_chosen = True


class Game:
    _remaining_cards = []

    def __init__(self, num_players: int) -> None:
        self.players = [Player() for _ in range(num_players)]
        self.player_counter = 0
        self._remaining_cards = []
        self._new_round()

    def move(self, card: Card, action: str) -> None:
        raise NotImplementedError()

    def switch_current_player(self) -> None:
        while True:
            self.player_counter = (self.player_counter + 1) % len(self.players)
            if not self.players[self.player_counter].is_killed:
                break

    def get_current_player(self) -> int:
        return self.player_counter

    def is_terminal(self) -> bool:
        raise NotImplementedError()

    def _new_round(self) -> None:
        for player in self.players:
            player.is_killed = False

        self._remaining_cards = self._shuffle_cards()

        for player in self.players:
            player.deck.append(self._remaining_cards.pop())

    def _shuffle_cards(self) -> list[Card]:
        raise NotImplementedError()
