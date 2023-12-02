import random
from enum import IntEnum
from queue import PriorityQueue

from custom_types import GameStatus


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
    def __init__(self, identifier: str, name: str = None):
        self._identifier = identifier
        if name is None:
            self._name = identifier
        else:
            self._name = name
        self._deck = []
        self._played_cards = []
        self.is_killed = False
        self.can_be_chosen = True
        self.score = 0

    def increment_score(self):
        self.score += 1

    def prepare_for_new_round(self):
        self._deck = []
        self._played_cards = []
        self.is_killed = False
        self.can_be_chosen = True

    def get_card_from_deck(self, deck: PriorityQueue):
        self._deck.append(deck.get())

    def __dict__(self):
        d_player = dict()
        d_player["id"] = self._identifier
        d_player["name"] = self._name
        d_player["score"] = self.score
        d_player["played_cards"] = self._played_cards
        d_player["alive"] = not self.is_killed
        d_player["how_many_cards"] = len(self._deck)
        return d_player


class Game:
    def __init__(self, num_players: int, name: str) -> None:
        self.players: list[Player] = []
        self.max_players: int = num_players
        self.player_counter: int = 0
        self.status: GameStatus = GameStatus.NOT_STARTED
        self.name: str = name
        self._remaining_cards: PriorityQueue = PriorityQueue()

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

    def switch_current_player(self) -> None:
        while True:
            self.player_counter = (self.player_counter + 1) % self.max_players
            if not self.players[self.player_counter].is_killed:
                self.players[self.player_counter].get_card_from_deck(
                    self._remaining_cards
                )
                break

    def add_new_player(self, name: str) -> None:
        if self.status in [GameStatus.STARTED, GameStatus.TERMINATED]:
            raise ValueError("Game has been started or was terminated")
        if self.does_player_exist(name):
            raise ValueError(f"Player with identifier={name} already exists")

        player = Player(name)
        self.players.append(player)

    def get_current_player(self) -> int:
        return self.player_counter

    def does_player_exist(self, name: str) -> bool:
        return name in self._get_players_identifiers()

    def start_game(self):
        if self.status == GameStatus.NOT_STARTED:
            self._new_round()
            self.status = GameStatus.STARTED
            self.max_players = len(self.players)
        else:
            raise ValueError("Game has been started or was terminated")

    def is_terminal(self) -> bool:
        raise NotImplementedError()

    def _new_round(self) -> None:
        for player in self.players:
            player.is_killed = False

        self._remaining_cards = self._create_new_deck()

        for player in self.players:
            player.get_card_from_deck(self._remaining_cards)

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

        # PriorityQueue for faster card gaining
        self._remaining_cards = PriorityQueue()
        for card in full_deck:
            self._remaining_cards.put(card)

    def _get_players_identifiers(self) -> tuple[str]:
        return (p._identifier for p in self.players)

    def __dict__(self):
        d_game = dict()
        d_game["id"] = self.name
        d_game["name"] = self.name
        d_game["status"] = str(self.status)
        d_game["current_player"] = self.get_current_player()

        # append players to the game dict
        d_game["players"] = []
        for player in self.players:
            d_game["players"].append(dict(player))

        return d_game
