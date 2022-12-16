import pymongo
from app.models.linea import Linea
from app.models.types import PyObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List, Optional
from app.service.error import NotFoundError

class LineaService:
    collection: AsyncIOMotorCollection

    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection

    async def get_all(self) -> List[Linea]:
        cursor = self.collection.find()
        return [Linea(**linea) async for linea in cursor]

    async def get_lineas_by_numero_sentido(self, codLinea: int, sentido: int) -> List[Linea]:
        pipeline = []
        if codLinea:
            pipeline.append({"$match": {"codLinea": codLinea}})
        if sentido:
            pipeline.append({"$match": {"sentido": sentido}})
        
        cursor = self.collection.aggregate(pipeline)
        return [Linea(**linea) async for linea in cursor]

    async def get_lineas_by_nombre(self, nombre: str) -> List[Linea]:
        pipeline = []
        if nombre:
            pipeline.append({"$match": {"nombreParada": {"$regex": nombre}}})

        cursor = self.collection.aggregate(pipeline)
        return [Linea(**linea) async for linea in cursor]

    """
    async def get_lineas_by_latitud_longitud(self, latitud: float, longitud: float) -> List[Linea]:
        cursor = self.collection.find()
        paradas = []
        for parada in cursor:
            if((latitud + 0.003 < parada["lat"] and longitud + 0.003 < parada["lon"]) or (latitud - 0.003 > parada["lat"] and longitud - 0.003 > parada["lon"])):
                paradas.append(parada)
        
        return paradas
    """
        