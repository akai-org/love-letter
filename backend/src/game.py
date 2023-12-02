import random
from enum import IntEnum
from queue import LifoQueue


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
        self.score = 0

    def increment_score(self):
        self.points += 1

    def prepare_for_new_round(self):
        self._deck = []
        self._played_cards = []
        self.is_killed = False
        self.can_be_chosen = True

    def get_card_from_deck(self, deck: LifoQueue):
        self._deck.append(deck.get())


class Game:
    def __init__(
        self, num_players: int, name: str, player_names: list[str]
    ) -> None:
        self.players: list[Player] = [
            Player(name, i) for i in range(num_players)
        ]
        self.max_players: int = num_players
        self.player_counter: int = 0
        self.status: str = "not_started"
        self.name: str = name
        self._remaining_cards: LifoQueue = LifoQueue()

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
            case _:
                raise NotImplementedError()

        # raise NotImplementedError()

    def switch_current_player(self) -> None:
        while True:
            self.player_counter = (self.player_counter + 1) % self.max_players
            if not self.players[self.player_counter].is_killed:
                self.players[self.player_counter].get_card_from_deck(
                    self._remaining_cards
                )
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
        full_deck.append(Card.NINE_PRINCESS)
        full_deck.append(Card.EIGHT_COUNTESS)
        full_deck.append(Card.SEVEN_KING)
        for _ in range(2):
            full_deck.append(Card.SIX_CHANCELLOR)
        for _ in range(2):
            full_deck.append(Card.FIVE_PRINCE)
        for _ in range(2):
            full_deck.append(Card.FOUR_HANDMAID)
        for _ in range(2):
            full_deck.append(Card.THREE_BARON)
        for _ in range(2):
            full_deck.append(Card.TWO_PRIEST)
        for _ in range(6):
            full_deck.append(Card.ONE_GUARD)
        for _ in range(2):
            full_deck.append(Card.ZERO_SPY)

        # get the deck ready for round(shuffle and remove one card)
        random.shuffle(full_deck)
        full_deck.pop()

        # LifoQueue for faster card gaining
        self._remaining_cards = LifoQueue()
        for card in full_deck:
            self._remaining_cards.put(card)

