from fastapi import FastAPI

app = FastAPI()

games_data = [
    {
        'game_id': '1',
        'max_players': 6,
        'players': 5
    },
    {
        'game_id': '2',
        'max_players': 6,
        'players': 3
    }
]

@app.get("/api/v1/games")
async def get_games(started: bool):
    if started==False:
        games = [
            {
                'game_id': game['game_id'],
                'max_players': game['max_players'],
                'players': game['players']
            }
            for game in games_data
        ]
        return {'games': games}
    else:
        return {'message': 'all games has already started'}
