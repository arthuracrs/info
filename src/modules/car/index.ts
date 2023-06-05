import { CarService } from "./core/car.service";
import { CarPostgresRepository } from "./adapters/repository/carSequelize.repository";
import { CarController } from "./presenters/car.controller";
import { InputValidationServiceJoi } from "./adapters/inputValidationServiceJoi";

const carPostgresRepository = new CarPostgresRepository();
const inputValidationServiceJoi = new InputValidationServiceJoi();
const carService = new CarService(
  carPostgresRepository,
  inputValidationServiceJoi,
);
const carController = new CarController(carService);

export { carController, carService };
