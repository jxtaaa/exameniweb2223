from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, Field, PositiveFloat
from app.models.types import PyObjectId


class Vivienda(BaseModel):
    id : PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user: str
    titulo: str
    descripcion: str
    precio: float
    direccion: str
    latitude: float
    longitude: float
    images: Optional[List[str]] = None
    
    class Config:
        json_encoders = {ObjectId: str}

class NewVivienda(BaseModel):
    titulo: str
    descripcion: str
    user:str
    precio: float
    direccion: str
    latitude: float
    longitude: float
    images: Optional[List[str]] = None
    
    class Config:
        json_encoders = {ObjectId: str}

class EditVivienda(BaseModel):
    titulo: str
    descripcion: str
    precio: PositiveFloat
    direccion: str
    latitude: float
    longitude: float
    images: Optional[List[str]] = None
