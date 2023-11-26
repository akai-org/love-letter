import random
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
    EIGHT_COUNTESS = 8
    NINE_PRINCESS = 9


class Player:
    def __init__(self):
        self._deck = []
        self._played_cards = []
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

    def get_card_from_deck(self, deck: list):
        pass


class Game:
    _remaining_cards = []

    def __init__(self, num_players: int) -> None:
        self.players = [Player() for _ in range(num_players)]
        self.player_counter = 0
        self._remaining_cards = []
        self._new_round()

    def move(self, card: Card, action: str) -> bool:
        current_player = self.players[self.player_counter]
        match card:
            case card.NINE_PRINCESS:
                if action == "PLAY_CARD":
                    current_player.is_killed = True
                    current_player.can_be_chosen = False
                    return True
                else:
                    return False
            case other:
                raise NotImplementedError()

        # raise NotImplementedError()

    def switch_current_player(self) -> None:
        while True:
            self.player_counter = (self.player_counter + 1) % len(self.players)
            if not self.players[self.player_counter].is_killed:
                self.players[self.player_counter].get_card_from_deck()
                break

    def get_current_player(self) -> int:
        return self.player_counter

    def is_terminal(self) -> bool:
        raise NotImplementedError()

    def _new_round(self) -> None:
        for player in self.players:
            player.is_killed = False

        self._remaining_cards = self._create_new_deck()

        for player in self.players:
            # player.deck.append(self._remaining_cards.pop())
            pass

    def _create_new_deck(self) -> list[Card]:
        full_deck = []

        # add all kinds of cards to deck in correct amounts
        full_deck.append(Card(9))
        full_deck.append(Card(8))
        full_deck.append(Card(7))
        for i in range(2):
            full_deck.append(Card(6))
        for i in range(2):
            full_deck.append(Card(5))
        for i in range(2):
            full_deck.append(Card(4))
        for i in range(2):
            full_deck.append(Card(3))
        for i in range(2):
            full_deck.append(Card(2))
        for i in range(6):
            full_deck.append(Card(1))
        for i in range(2):
            full_deck.append(Card(0))

        # get the deck ready for round(shuffle and remove one card)
        random.shuffle(full_deck)
        full_deck.pop()
        self._remaining_cards = full_deck

        # raise NotImplementedError()
