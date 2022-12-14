from typing import List, Optional
from fastapi import APIRouter, Depends

from app.models.linea import Linea

from app.models.vivienda import Vivienda
from app.models.usuario import  Usuario, NewUsuario, EditUsuario, UsuarioFilter
from app.models.vivienda import NewVivienda
from app.service.vivienda import ViviendaService
from app.service.usuario import UsuarioService
from app.service.linea import LineaService
from app.dependencies import get_vivienda_service
from app.dependencies import get_usuario_service
from app.dependencies import get_linea_service
from app.models.types import PyObjectId
from app.models.vivienda import EditVivienda
from app.auth import Authentication, Claims

router = APIRouter()

@router.get("/lineas", response_model=List[Linea], operation_id="get_lineas", tags=["Lineas"])
async def get_lineas(numLinea: Optional[int] = None, sentido: Optional[int] = None, service: LineaService = Depends(get_linea_service)):
    return await service.get_lineas_by_numero_sentido(numLinea, sentido)

@router.get("/lineas/{nombre}", response_model=List[Linea], operation_id="get_lineas_by_nombre", tags=["Lineas"])
async def get_lineas_by_nombre(nombre: str, service: LineaService = Depends(get_linea_service)):
    return await service.get_lineas_by_nombre(nombre)

@router.get("/lineas/{latitud}/{longitud}", tags=["Lineas"])
async def get_lineas_by_latitud_longitud(latitud: float, longitud: float, service: LineaService = Depends(get_linea_service)):
    return await service.get_lineas_by_latitud_longitud(latitud, longitud)



### IGNORAR ###

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


@router.get("/usuarios/{id}", response_model=Usuario, operation_id="get_user_by_id", tags=["Ignorar"])
async def get_user(id: PyObjectId, service: UsuarioService = Depends(get_usuario_service)):
    return await service.get_usuario_by_id(id)

@router.get("/usuarios", response_model=List[Usuario], operation_id="get_user_by_filter", tags=["Ignorar"])
async def get_user_by_filter(nombre: Optional[str] = None, email:Optional[str] = None , service: UsuarioService = Depends(get_usuario_service)):
    f = UsuarioFilter(nombre=nombre, email=email)
    return await service.get_usuario_by_filter(f)

@router.post("/usuarios", response_model=Usuario, operation_id="new_user", tags=["Ignorar"])
async def create_user(request: NewUsuario, service: UsuarioService = Depends(get_usuario_service)):
    return await service.new_usuario(request)

@router.delete("/usuarios/{id}", operation_id="delete_user", tags=["Ignorar"])
async def delete_user(id: PyObjectId, service: UsuarioService = Depends(get_usuario_service)):
    return await service.del_usuario(id)

@router.put("/usuarios/{id}", response_model=Usuario, operation_id="edit_user", tags=["Ignorar"])
async def edit_user(id: PyObjectId, request: EditUsuario, service: UsuarioService = Depends(get_usuario_service)):
    return await service.edit_usuario(id, request)


