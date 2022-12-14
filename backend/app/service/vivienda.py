import pymongo
from app.models.vivienda import Vivienda
from app.models.vivienda import NewVivienda
from app.models.types import PyObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List, Optional
from app.service.error import NotFoundError
from app.models.vivienda import EditVivienda

class ViviendaService:
    collection: AsyncIOMotorCollection

    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection

    async def new_vivienda(self, request: NewVivienda) -> Vivienda:
        document = request.dict()
        
        result = await self.collection.insert_one(document)   
        if document["images"] == None:
            document["images"] = []
        if result.inserted_id:
            return Vivienda(
                id = result.inserted_id,
                **document
            )

    async def get_all_viviendas(self) -> List[Vivienda]:
        cursor = self.collection.find()
        viviendas = []
        async for document in cursor:
            viviendas.append(Vivienda(**document))
        return viviendas
    
    async def get_vivienda_by_id(self, id: PyObjectId) -> Vivienda:
        document = await self.collection.find_one({"_id": id})
        if document:
            return Vivienda(**document)
        raise NotFoundError("Vivienda not found")

    async def delete_vivienda(self, id: PyObjectId):
        result = await self.collection.delete_one({"_id": id})
        if result.deleted_count == 0:
            raise NotFoundError("Vivienda not found")
    
    async def edit_vivienda(self, id: PyObjectId, request: EditVivienda) -> Vivienda:
        result = await self.collection.find_one_and_update(
            {"_id": id}, 
            {"$set": request.dict()},
            return_document=pymongo.ReturnDocument.AFTER)
        if result:
            return Vivienda(**result)
        else:
            raise NotFoundError("Vivienda not found")   