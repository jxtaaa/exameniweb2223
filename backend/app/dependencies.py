
from functools import lru_cache
from fastapi import Depends
from httpx import AsyncClient
from motor.motor_asyncio import AsyncIOMotorClient

from app.service.vivienda import ViviendaService

from .settings import Settings


@lru_cache
def get_settings() -> Settings:
    return Settings()


@lru_cache
def get_mongo_client(config: Settings = Depends(get_settings)):
    # set a 5-second connection timeout
    return AsyncIOMotorClient(config.mongo.url, serverSelectionTimeoutMS=5000)


@lru_cache
def get_mongo_database(
        client=Depends(get_mongo_client), settings: Settings = Depends(get_settings)
):
    return client[settings.mongo.database]


@lru_cache
def get_app_collection(
        database=Depends(get_mongo_database), settings: Settings = Depends(get_settings)
):
    return database[settings.mongo.collection]


@lru_cache
def get_vivienda_service(collection=Depends(get_app_collection)) -> ViviendaService:
    return ViviendaService(collection)

_keys = None

async def get_public_key(settings: Settings = Depends(get_settings)):
    global _keys
    if _keys:
        return _keys
    
    async with AsyncClient(base_url=settings.auth.baseurl) as client:
        response = await client.get("/.well-known/jwks.json")
        _keys = response.json()["keys"]
    
    return _keys
