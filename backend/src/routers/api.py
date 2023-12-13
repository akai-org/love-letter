from fastapi import APIRouter, Body, HTTPException
from src.dependencies import get_manager

router = APIRouter()

games_data = [
    {"game_id": "1", "max_players": 6, "players": 5},
    {"game_id": "2", "max_players": 6, "players": 3},
    {"game_id": "3", "max_players": 4, "players": 4},
]


@router.get("/api/v1/games")
async def get_games(started: bool):
    if started == False:
        games = [
            game
            for game in games_data
            if game["players"] < game["max_players"]
        ]
        return {"games": games}
    else:
        return {"message": "all games has already started"}


@router.post("/api/v1/games")
async def create_game(
    room_name: str = Body(...),
    max_players: int = Body(...),
    password: str = Body(None),
):
    try:
        manager = await get_manager().__anext__()
        manager.add_new_game(max_players, room_name, password)
        return {"status": "Game created successfully"}
    except ValueError as e:
        raise HTTPException(status_code=403, detail=str(e))
