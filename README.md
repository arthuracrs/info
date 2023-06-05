# info

## SETUP
Api utiliza um arquivo como Data Base

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
