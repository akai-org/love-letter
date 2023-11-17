from fastapi import FastAPI

from routers.api import router as api_router
from routers.websocket import router as websocket_router

app = FastAPI()

app.include_router(api_router)
app.include_router(websocket_router)
