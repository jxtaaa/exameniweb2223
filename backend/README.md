
# Segundo parcial iWeb. API REST.
## José Luis Bueno Pachón. 
Instrucciones para arrancar el microservicio:
- ```source env/bin/activate``` para abrir el virtual environment.
- ```python3.10 -m pip install -r examenREST/requirements.txt``` para instalar los módulos python necesarios.
- ```cd examenREST; docker compose up -d``` para iniciar el contenedor de la base de datos.
- ```uvicorn app:app``` para lanzar el servidor.

Se incluyen los .json de las colecciones de la base de datos en la carpeta ```db``` y la especificación de la API en el fichero openapi.json.

