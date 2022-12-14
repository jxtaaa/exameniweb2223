from typing import List
from fastapi import APIRouter, Depends

from app.models.vivienda import Vivienda
from app.models.vivienda import NewVivienda
from app.service.vivienda import ViviendaService
from app.dependencies import get_vivienda_service
from app.models.types import PyObjectId
from app.models.vivienda import EditVivienda
from app.auth import Authentication, Claims

router = APIRouter()

@router.get("/viviendas", response_model=List[Vivienda], operation_id="get_houses")
async def get_houses(service: ViviendaService = Depends(get_vivienda_service)):
    return await service.get_all_viviendas()

@router.get("/viviendas/{id}", response_model=Vivienda, operation_id="get_house_by_id")
async def get_house(id: PyObjectId, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.get_vivienda_by_id(id)

@router.post("/viviendas", response_model=Vivienda, operation_id="new_house")
async def create_house(request: NewVivienda, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.new_vivienda(request)

@router.delete("/viviendas/{id}", operation_id="delete_house")
async def delete_house(id: PyObjectId, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.delete_vivienda(id)

@router.put("/viviendas/{id}", response_model=Vivienda, operation_id="edit_house")
async def edit_house(id: PyObjectId, request: EditVivienda, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.edit_vivienda(id, request)

@router.get("/auth")
async def auth(auth: Claims=Depends(Authentication)) -> str:
    print(auth)
    return auth[9:44:1]


