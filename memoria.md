---
title: Memoria técnica 3er Parcial
author: José Luis Bueno Pachón
---


# URL donde se ha desplegado la aplicación:

[](https://exameniweb2223.vercel.app)

# Tecnologías utilizadas (proveedor cloud, lenguaje de programación, framework, base de datos, etc.):

- Backend:
  - Python
  - FastAPI
- Base de datos:
  - MongoDB
- Frontend:
  - Framework: Node.js
  - Plantillas Astro
  - Componentes Svelte
  - Typescript + Javascript

# Instrucciones de instalación y despliegue, tanto en local como en la nube, en particular si se ha utilizado alguna tecnología diferente de las presentadas en clase.

## Despliegue local

Se da listo para ejecutar el fichero ubicado en la carpeta raíz
`docker-compose.yml`, útil para ejecutar tango la base de datos como el backend
de toda la aplicación web.

Por otro lado, ejecutando `npm i` y luego `npm run dev` debería estar
ejecutándose todo el frontend de la aplicación web.

Se dan configurados todas las variables de entorno en el fichero
`/frontend/.env`

## Despliegue en la nube

Se incluye el fihcero `examenIWEBKEY.pem` en la carpeta raíz del proyecto, se
puede usar el siguiente comando para acceder a la máquina virtual donde se aloja
todo el backend y la base de datos de la aplicación:
`ssh -i "examenIWEBKEY.pem" ubuntu@ec2-35-181-59-150.eu-west-3.compute.amazonaws.com`
