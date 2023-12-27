from queue import PriorityQueue

from src.core.card import Card


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
        self.is_protected = True

    def get_card_from_deck(self, deck: PriorityQueue):
        self.is_protected = False
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