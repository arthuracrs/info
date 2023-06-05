# info

## SETUP

Api utiliza postgres como Data Base

docker compose para iniciar o Postgres:

```
version: '3'
services:
  dbPostgres:
    image: postgres
    restart: always
    ports:
        - 5432:5432
    environment:
        POSTGRES_USER: root
        POSTGRES_PASSWORD: changeme
        POSTGRES_DB: mydb
```

### criar db de test:e2e. Nome: e2etest

## CRUD Endpoints

 - Create Car: POST - /car

```
Request body:
 {
    "placa": "ABC1234",
    "chassi": "1HGCM82633A123456",
    "renavam": "12345678901",
    "modelo": "Sedan",
    "marca": "Honda",
    "ano": "2022"
  }
```

- Read Car By Id:    GET - /car/:id

- Update Car:        PATCH - /car/:id

- Delete Car:        DELETE - /car/:id

- List All Cars:     GET - /car
