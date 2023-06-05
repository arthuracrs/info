import { assert } from "chai";
import { v4 as uuid } from "uuid";
import sinon from "sinon";

import { Car } from "../../../../src/modules/car/core/car.model";
import { CarService } from "../../../../src/modules/car/core/car.service";
import { InputValidationServiceJoi } from "../../../../src/modules/car/adapters/inputValidationServiceJoi";
import { CarPostgresRepository } from "../../../../src/modules/car/adapters/carSequelize.repository";
import { CarFromDbDto } from "../../../../src/modules/car/core/dto/carFromDbDto";
import { ValidationServiceError } from "../../../../src/modules/car/core/car.errors";

describe("CarService", () => {
  before(() => console.clear());
  
  describe("createCar", () => {
    it("should create a new car", async () => {
      const carInput = {
        placa: "ABC1234",
        chassi: "1HGCM82633A123456",
        renavam: "12345678901",
        modelo: "Sedan",
        marca: "Honda",
        ano: "2022",
      };
      const carFromDbDto = new CarFromDbDto({
        ...carInput,
        carId: uuid(),
      });

      const carPostgresRepositoryMock = sinon.createStubInstance(
        CarPostgresRepository,
      );
      carPostgresRepositoryMock.create.resolves(carFromDbDto);
      const inputValidationServiceJoi = new InputValidationServiceJoi();
      const carService = new CarService(
        carPostgresRepositoryMock,
        inputValidationServiceJoi,
      );

      const result = await carService.createCar(carInput);

      assert.instanceOf(result, Car);
      assert.isString(result.carId);
      assert.equal(result.placa, carInput.placa);
      assert.equal(result.chassi, carInput.chassi);
      assert.equal(result.renavam, carInput.renavam);
      assert.equal(result.modelo, carInput.modelo);
      assert.equal(result.marca, carInput.marca);
      assert.equal(result.ano, carInput.ano);
    });

    it("should throw an error when input is invalid", async () => {
      const invalidCarInput = {
        placa: "ABC123",
        chassi: "123456",
        renavam: "789012",
        modelo: "Sedan",
        marca: "Toyota",
        ano: "2020",
      };
      let error;
      try {
        const carPostgresRepositoryMock = sinon.createStubInstance(
          CarPostgresRepository,
        );
        const inputValidationServiceJoi = new InputValidationServiceJoi();
        const carService = new CarService(
          carPostgresRepositoryMock,
          inputValidationServiceJoi,
        );
        await carService.createCar(invalidCarInput);
      } catch (err) {
        error = err;
      }

      assert.instanceOf(error, ValidationServiceError);
    });
  });

  describe("getCarById", () => {
    it("should get a car by ID", async () => {
      const carId = uuid();

      const carFromDbDto = new CarFromDbDto({
        placa: "ABC1234",
        chassi: "1HGCM82633A123456",
        renavam: "12345678901",
        modelo: "Sedan",
        marca: "Honda",
        ano: "2022",
        carId,
      });

      const carPostgresRepositoryMock = sinon.createStubInstance(
        CarPostgresRepository,
      );
      carPostgresRepositoryMock.findById.resolves(carFromDbDto);
      const inputValidationServiceJoi = new InputValidationServiceJoi();
      const carService = new CarService(
        carPostgresRepositoryMock,
        inputValidationServiceJoi,
      );

      const result = await carService.getCarById(carId);

      assert.instanceOf(result, Car);
      assert.equal(result?.carId, carId);
    });

    it("should throw an error when input is invalid", async () => {
      const invalidCarId = "invalidId";

      let error;
      try {
        const carPostgresRepositoryMock = sinon.createStubInstance(
          CarPostgresRepository,
        );
        const inputValidationServiceJoi = new InputValidationServiceJoi();
        const carService = new CarService(
          carPostgresRepositoryMock,
          inputValidationServiceJoi,
        );

        await carService.getCarById(invalidCarId);
      } catch (err) {
        error = err;
      }

      assert.instanceOf(error, ValidationServiceError);
    });
  });

  describe("getAllCars", () => {
    it("should return an array of cars", async () => {
      const carFromDbDto = new CarFromDbDto({
        placa: "ABC1234",
        chassi: "1HGCM82633A123456",
        renavam: "12345678901",
        modelo: "Sedan",
        marca: "Honda",
        ano: "2022",
        carId: uuid(),
      });

      const carPostgresRepositoryMock = sinon.createStubInstance(
        CarPostgresRepository,
      );
      carPostgresRepositoryMock.findAll.resolves([carFromDbDto]);
      const inputValidationServiceJoi = new InputValidationServiceJoi();
      const carService = new CarService(
        carPostgresRepositoryMock,
        inputValidationServiceJoi,
      );

      const result = await carService.getAllCars();

      assert.isArray(result);
      assert.isNotEmpty(result);
      assert.instanceOf(result[0], Car);
    });
  });

  describe("updateCar", () => {
    it("should update a car", async () => {
      const carId = uuid();
      const updateData = {
        modelo: "New Model",
        ano: "2023",
      };
      const carFromDbDto = new CarFromDbDto({
        placa: "ABC1234",
        chassi: "1HGCM82633A123456",
        renavam: "12345678901",
        modelo: updateData.modelo,
        marca: "Honda",
        ano: updateData.ano,
        carId,
      });

      const carPostgresRepositoryMock = sinon.createStubInstance(
        CarPostgresRepository,
      );
      carPostgresRepositoryMock.update.resolves(carFromDbDto);
      const inputValidationServiceJoi = new InputValidationServiceJoi();
      const carService = new CarService(
        carPostgresRepositoryMock,
        inputValidationServiceJoi,
      );
      const result = await carService.updateCar(carId, updateData);

      assert.instanceOf(result, Car);
      assert.equal(result.carId, carId);
      assert.equal(result.modelo, updateData.modelo);
      assert.equal(result.ano, updateData.ano);
    });

    it("should throw an error when input is invalid", async () => {
      const invalidCarId = "invalidId";
      const updateData = {};

      let error;
      try {
        const carPostgresRepositoryMock = sinon.createStubInstance(
          CarPostgresRepository,
        );
        const inputValidationServiceJoi = new InputValidationServiceJoi();
        const carService = new CarService(
          carPostgresRepositoryMock,
          inputValidationServiceJoi,
        );
        await carService.updateCar(invalidCarId, updateData);
      } catch (err) {
        error = err;
      }

      assert.instanceOf(error, ValidationServiceError);
    });
  });

  describe("deleteCarById", () => {
    it("should delete a car", async () => {
      const carId = uuid();
      const carPostgresRepositoryMock = sinon.createStubInstance(
        CarPostgresRepository,
      );
      carPostgresRepositoryMock.delete.resolves();
      const inputValidationServiceJoi = new InputValidationServiceJoi();
      const carService = new CarService(
        carPostgresRepositoryMock,
        inputValidationServiceJoi,
      );
      const result = await carService.deleteCarById(carId);

      assert.equal(result, "deleted");
    });

    it("should throw an error when input is invalid", async () => {
      const invalidCarId = "invalidId";

      let error;
      try {
        const carPostgresRepositoryMock = sinon.createStubInstance(
          CarPostgresRepository,
        );
        const inputValidationServiceJoi = new InputValidationServiceJoi();
        const carService = new CarService(
          carPostgresRepositoryMock,
          inputValidationServiceJoi,
        );
        await carService.deleteCarById(invalidCarId);
      } catch (err) {
        error = err;
      }

      assert.instanceOf(error, ValidationServiceError);
    });
  });
});
