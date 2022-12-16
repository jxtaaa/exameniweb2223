import pymongo
from app.models.usuario import Usuario, NewUsuario, EditUsuario, UsuarioFilter
from app.models.types import PyObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List, Optional
from app.service.error import NotFoundError

class UsuarioService:
    collection: AsyncIOMotorCollection

    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection

    async def new_usuario(self, request: NewUsuario) -> Usuario:
        document = request.dict()

        result = await self.collection.insert_one(document)
        if result.inserted_id:
            return Usuario(
                id = result.inserted_id,
                **document
            )
        else:
            raise NotFoundError("Usuario not found")

    async def get_usuarios(self) -> List[Usuario]:
        cursor = self.collection.find()
        usuarios = []
        async for document in cursor:
            usuarios.append(Usuario(**document))
        return usuarios

    async def get_usuario_by_filter(self, f: UsuarioFilter) -> List[Usuario]:
        pipeline = []
        if f.nombre:
            pipeline.append({"$match": {"nombre": f.nombre}})
        if f.email:
            pipeline.append({"$match": {"email": f.email}})

        return [
            Usuario(**document)
            async for document in self.collection.aggregate(pipeline)
        ]
    
    async def get_usuario_by_id(self, id: PyObjectId) -> Usuario:
        document = await self.collection.find_one({"_id": id})
        if document:
            return Usuario(**document)
        else:
            raise NotFoundError("Usuario not found")
    
    async def del_usuario(self, id: PyObjectId):
        result = await self.collection.delete_one({"_id": id})
        if result.deleted_count == 0:
            raise NotFoundError("Usuario not found")

    async def edit_usuario(self, id: PyObjectId, request: EditUsuario) -> Usuario:
        result = await self.collection.find_one_and_update(
            {"_id": id}, 
            {"$set": request.dict()},
            return_document=pymongo.ReturnDocument.AFTER)
        if result:
            return Usuario(**result)
        else:
            raise NotFoundError("Usuario not found")