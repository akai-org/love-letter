from src.game_manager import GameManager


async def get_manager() -> GameManager:
    try:
        yield get_manager.manager
    except AttributeError:
        get_manager.manager = GameManager()
        yield get_manager.manager
