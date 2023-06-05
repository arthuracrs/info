import { assert, expect } from "chai";
import axios from "axios";

import { bootstrap } from "./main";

const BASE_URL = "http://localhost:3000";

const createCar = async () => {
  const createCarBody = {
    placa: "ABC1234",
    chassi: "1HGCM82633A123456",
    renavam: "12345678901",
    modelo: "Sedan",
    marca: "Honda",
    ano: "2022",
  };

  const createCarResponse = await axios.post(`${BASE_URL}/car`, createCarBody);

  return createCarResponse.data;
};

describe("API CRUD test", () => {
  let server;

  before(async () => {
    console.clear();
    server = await bootstrap();
  });

  after((done) => server.close(done));

  it("Health", async () => {
    const response = await axios.get(`${BASE_URL}/health`);

    assert.equal(response.status, 200);
    assert.equal(response.data, "alive");
  });

  it("Create car", async () => {
    const body = {
      placa: "ABC1234",
      chassi: "1HGCM82633A123456",
      renavam: "12345678901",
      modelo: "Sedan",
      marca: "Honda",
      ano: "2022",
    };

    const response = await axios.post(`${BASE_URL}/car`, body);

    assert.equal(response.status, 200);
    expect(response.data).to.have.property("carId");
  });

  it("Update Car", async () => {
    const createdCar = await createCar();

    const body = {
      "marca": "fon",
    };

    const response = await axios.patch(
      `${BASE_URL}/car/${createdCar.carId}`,
      body,
    );

    const expectedMarca = "fon";

    assert.equal(response.status, 200);
    expect(response.data.marca).to.equal(expectedMarca);
  });

  it("List All Cars", async () => {
    const createdCar = await createCar();
    const response = await axios.get(`${BASE_URL}/car`);

    assert.equal(response.status, 200);
    expect(response.data).to.have.length.above(1);
  });

  it("Get Car By Id", async () => {
    const createdCar = await createCar();
    const response = await axios.get(`${BASE_URL}/car/${createdCar.carId}`);

    assert.equal(response.status, 200);
  });

  it("Delete Car", async () => {
    const createdCar = await createCar();
    const response = await axios.delete(`${BASE_URL}/car/${createdCar.carId}`);

    assert.equal(response.status, 200);
  });
});
