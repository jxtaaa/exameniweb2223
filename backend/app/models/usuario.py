from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, Field, PositiveFloat
from app.models.types import PyObjectId

class Usuario(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    nombre: str
    email: str
    apellidos: str
    direccion: str
    latitude : float
    longitude : float
    foto: str

    class Config:
        json_encoders = {ObjectId: str}

class NewUsuario(BaseModel):
    nombre: str
    email: str
    apellidos: str
    direccion: str
    latitude : float
    longitude : float
    foto: str

    class Config:
        json_encoders = {ObjectId: str}

class EditUsuario(BaseModel):
    nombre: str
    email: str
    apellidos: str
    direccion: str
    latitude : float
    longitude : float
    foto: str

    class Config:
        json_encoders = {ObjectId: str}


