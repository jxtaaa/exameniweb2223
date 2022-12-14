from typing import Any, List
from fastapi import Depends
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from jose.utils import base64url_decode
from jose.jwt import decode
from json import loads

from ..settings import Settings
from ..dependencies import get_settings, get_public_key

class AuthenticationError(Exception):
    pass


class Claims(BaseModel):
    sub: str
    exp: int
    iat: int
    iss: str
    #email: str
    #email_verified: str

scheme = HTTPBearer()


def Authentication(
    credentials: HTTPBearer = Depends(scheme),
    keys: List[Any] = Depends(get_public_key),
    settings: Settings = Depends(get_settings)
) -> Claims:
    token: str = credentials.credentials

    try:
        payload = decode(
            token, 
            key=keys,
            audience=settings.auth.audience
        )
        print(payload)
        return Claims(**payload).json()
    except Exception as e:
        raise AuthenticationError(e)