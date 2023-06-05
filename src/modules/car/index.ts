import { CarService } from "./core/car.service";
import { CarController } from "./presenters/car.controller";
import { InputValidationServiceJoi } from "./adapters/inputValidationServiceJoi";
import { ICarRepository } from "./core/carRepository.port";
import { CarFileRepository } from "./adapters/carFile.repository";

export class CarModule {
  private carRepository: ICarRepository;
  private inputValidationServiceJoi: InputValidationServiceJoi;

  public carService: CarService;
  public carController: CarController;

  constructor() {
    this.carRepository = new CarFileRepository("database.txt");
    this.inputValidationServiceJoi = new InputValidationServiceJoi();
    this.carService = new CarService(
      this.carRepository,
      this.inputValidationServiceJoi,
    );
    this.carController = new CarController(this.carService);
  }
}
