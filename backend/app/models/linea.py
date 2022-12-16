from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, Field, PositiveFloat
from app.models.types import PyObjectId

class Linea(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    codLinea: int
    nombreLinea: str
    sentido: int
    orden: str
    codParada: str
    nombreParada: str
    direccion: str
    lat: float
    lon: float

    class Config:
        json_encoders = {ObjectId: str}