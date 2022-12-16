from typing import List
from fastapi import APIRouter, Depends

from app.models.vivienda import Vivienda
from app.models.usuario import  Usuario, NewUsuario, EditUsuario
from app.models.vivienda import NewVivienda
from app.service.vivienda import ViviendaService
from app.service.usuario import UsuarioService
from app.dependencies import get_vivienda_service
from app.dependencies import get_usuario_service
from app.models.types import PyObjectId
from app.models.vivienda import EditVivienda
from app.auth import Authentication, Claims

router = APIRouter()



@router.get("/viviendas", response_model=List[Vivienda], operation_id="get_houses", tags=["Ignorar"])
async def get_houses(service: ViviendaService = Depends(get_vivienda_service)):
    return await service.get_all_viviendas()

@router.get("/viviendas/{id}", response_model=Vivienda, operation_id="get_house_by_id", tags=["Ignorar"])
async def get_house(id: PyObjectId, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.get_vivienda_by_id(id)

@router.post("/viviendas", response_model=Vivienda, operation_id="new_house", tags=["Ignorar"])
async def create_house(request: NewVivienda, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.new_vivienda(request)

@router.delete("/viviendas/{id}", operation_id="delete_house", tags=["Ignorar"])
async def delete_house(id: PyObjectId, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.delete_vivienda(id)

@router.put("/viviendas/{id}", response_model=Vivienda, operation_id="edit_house", tags=["Ignorar"])
async def edit_house(id: PyObjectId, request: EditVivienda, service: ViviendaService = Depends(get_vivienda_service)):
    return await service.edit_vivienda(id, request)



@router.get("/auth", tags=["Auth"])
async def auth(auth: Claims=Depends(Authentication)) -> str:
    print(auth)
    return auth[9:44:1]


#### usuario

@router.get("/usuarios", response_model=List[Usuario], operation_id="get_users", tags=["Ignorar"])
async def get_users(service: UsuarioService = Depends(get_usuario_service)):
    return await service.get_usuarios()

@router.get("/usuarios/{id}", response_model=Usuario, operation_id="get_user_by_id", tags=["Ignorar"])
async def get_user(id: PyObjectId, service: UsuarioService = Depends(get_usuario_service)):
    return await service.get_usuario_by_id(id)

@router.post("/usuarios", response_model=Usuario, operation_id="new_user", tags=["Ignorar"])
async def create_user(request: NewUsuario, service: UsuarioService = Depends(get_usuario_service)):
    return await service.new_usuario(request)

@router.delete("/usuarios/{id}", operation_id="delete_user", tags=["Ignorar"])
async def delete_user(id: PyObjectId, service: UsuarioService = Depends(get_usuario_service)):
    return await service.del_usuario(id)

@router.put("/usuarios/{id}", response_model=Usuario, operation_id="edit_user", tags=["Ignorar"])
async def edit_user(id: PyObjectId, request: EditUsuario, service: UsuarioService = Depends(get_usuario_service)):
    return await service.edit_usuario(id, request)





