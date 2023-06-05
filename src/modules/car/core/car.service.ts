import { v4 as uuid } from "uuid";

import { ICarRepository } from "./carRepository.port";
import { Car } from "./car.model";
import { IInputValidationService } from "./inputValidationService.port";
import { CarNotFoundError } from "./car.errors";

interface ICreateCarInput {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;
}

export class CarService {
  private carRepository: ICarRepository;
  private inputValidationService: IInputValidationService;

  constructor(
    carRepository: ICarRepository,
    inputValidationService: IInputValidationService,
  ) {
    this.inputValidationService = inputValidationService;
    this.carRepository = carRepository;
  }

  public async createCar(carInput: ICreateCarInput) {
    this.inputValidationService.createCarInputIsValid(carInput);

    const newCar = new Car(carInput);

    newCar.carId = uuid();

    const carFromReposittory = await this.carRepository.create(newCar);
    const car = new Car(carFromReposittory);

    return car;
  }

  public async getCarById(carId: string) {
    this.inputValidationService.getCarByIdInputIsValid(carId);

    const carFromRepository = await this.carRepository.findById(carId);
    if (!carFromRepository) {
      return null;
    }
    const car = new Car(carFromRepository);

    return car;
  }

  public async getAllCars(): Promise<Car[]> {
    const carsFromRepository = await this.carRepository.findAll();

    return carsFromRepository.map((carFromRepository) => {
      const car = new Car(carFromRepository);

      return car;
    });
  }

  public async updateCar(carId: string, updateData: Partial<Car>) {
    this.inputValidationService.updateInputIsValid(carId, updateData);

    const carFromReposittory = await this.carRepository.update(
      carId,
      updateData,
    );
    const car = new Car(carFromReposittory);

    return car;
  }

  public async deleteCarById(carId: string): Promise<string> {
    this.inputValidationService.deleteCarByIdInputIsValid(carId);

    await this.carRepository.delete(carId);

    return "deleted";
  }
}
