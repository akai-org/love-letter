import random
from enum import IntEnum
from queue import PriorityQueue

from src.custom_types import GameStatus


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
        self.is_protected = False
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

    def discard(self, card: Card):
        self._deck.pop(card)
        return card

    def to_dict(self):
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

    def move(self, card: Card, action: list[str]) -> bool:
        current_player = self.players[self.player_counter]
        ## Przenieś countess condition przed
        match card:
            case card.NINE_PRINCESS:
                if self.check_countess_condition():
                    # you cant play this card, prince or king in hand, have to play countess
                    return False
                elif action == "PLAY_CARD":
                    current_player.is_killed = True
                    current_player.can_be_chosen = False
                    return True
                else:
                    return False

            case card.EIGHT_COUNTESS:
                if action == "PLAY_CARD":
                    return True
                else:
                    return False

            case card.SEVEN_KING:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    chosen_player_id = action[0]
                    if self.find_player(chosen_player_id):
                        self.switch_cards_with_another_player(chosen_player_id)
                        return True
                    else:
                        # Chosen player does not exist
                        return False
                else:
                    # action is not possible
                    return False

            case card.SIX_CHANCELLOR:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    if len(self._remaining_cards) < 1:
                        return True
                    elif len(self._remaining_cards) < 2:
                        current_player.get_card_from_deck()
                        # dummy data
                        card_to_discard = random.choice(current_player._deck)
                        self.card_back_to_remainig_cards(
                            current_player.discard(card_to_discard)
                        )
                    else:
                        current_player.get_card_from_deck()
                        current_player.get_card_from_deck()
                        self.card_back_to_remainig_cards(
                            current_player.discard(card_to_discard)
                        )
                        self.card_back_to_remainig_cards(
                            current_player.discard(card_to_discard)
                        )

                    return True
                else:
                    return False

            case card.FIVE_PRINCE:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    if self.find_player:
                        chosen_player = self.players[Player._identifier]
                        chosen_player.discard()
                        chosen_player.get_card_from_deck()
                    else:
                        # player not availible
                        return False
                    return True
                else:
                    return False

            case card.FOUR_HANDMAID:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    current_player.is_protected = True
                    return True
                else:
                    return False

            case card.THREE_BARON:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    if self.find_player:
                        chosen_player = self.players[Player._identifier]
                        loser_player = self.compare_two_players_cards(
                            current_player, chosen_player
                        )
                        if len(loser_player > 1):
                            # nobody gets killed
                            pass
                        else:
                            loser_player[0].is_killed = True
                    return True
                else:
                    return False

            case card.TWO_PRIEST:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    # send info to frontend
                    self.show_cards_of_other_player(
                        current_player, chosen_player
                    )
                    return True
                else:
                    return False

            case card.ONE_GUARD:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    return True
                else:
                    return False

            case card.ZERO_SPY:
                if self.check_countess_condition():
                    return False
                elif action == "PLAY_CARD":
                    return True
                else:
                    return False

            case other:
                # this card doesn't exist
                pass

    # checks if player has king or prince in hand
    def check_countess_condition(self):
        current_player = self.players[self.player_counter]
        if current_player._played_cards[-1] == Card.SIX_CHANCELLOR:
            return False
        elif (
            Card.SEVEN_KING in current_player._deck
            or Card.FIVE_PRINCE in current_player._deck
        ):
            return True
        else:
            return False

    def switch_cards_with_another_player(self, second_player: Player):
        current_player = self.players[self.player_counter]
        current_player._deck, second_player._deck = (
            second_player._deck,
            current_player._deck,
        )

    # fix this function
    def compare_two_players_cards(
        current_player: Player, chosen_player: Player
    ) -> Player:
        min(current_player._deck, chosen_player._deck)
        return

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

    def find_player(self, chosen_player_identifier: str) -> Player | None:
        for player in self.players:
            if player._identifier == chosen_player_identifier:
                return player
        return None

    def does_player_exist(self, name: str) -> bool:
        return name in self._get_players_identifiers()

    def remove_player(self, name: str):
        if self.status == GameStatus.NOT_STARTED:
            player = self.find_player(name)
            if player is None:
                raise ValueError("Player with this identifier was not found")
            else:
                self.players.remove(player)
        else:
            raise ValueError("Game has been started or was terminated")

    def start_game(self):
        if self.status == GameStatus.NOT_STARTED:
            self._new_round()
            self.status = GameStatus.STARTED
            self.max_players = len(self.players)
        else:
            raise ValueError("Game has been started or was terminated")

    def to_dict(self, player_name: str = None):
        d_game = dict()
        d_game["id"] = self.name
        d_game["name"] = self.name
        d_game["status"] = str(self.status)
        d_game["current_player"] = self.get_current_player()

        # append players to the game dict
        d_game["players"] = []
        for player in self.players:
            d_game["players"].append(player.to_dict())

        return d_game

    def is_terminal(self) -> bool:
        raise NotImplementedError()

    def _new_round(self) -> None:
        for player in self.players:
            player.is_killed = False
            player.is_protected = False

        self._create_new_deck()

        for player in self.players:
            player.get_card_from_deck(self._remaining_cards)

    def _create_new_deck(self) -> None:
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

    def card_back_to_remainig_cards(self, card: Card):
        self._remaining_cards.appen(card)

    def _get_players_identifiers(self) -> tuple[str]:
        return (p._identifier for p in self.players)
