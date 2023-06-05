import { v4 as uuid } from "uuid";

import { ICarRepository } from "./carRepository.port";
import { Car } from "./car.model";
import { IInputValidationService } from "./inputValidationService.port";

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
    if (!this.inputValidationService.createCarInputIsValid(carInput)) {
      throw new Error();
    }

    const newCar = new Car(carInput);

    newCar.carId = uuid();

    const carFromReposittory = await this.carRepository.create(newCar);
    const car = new Car(carFromReposittory);

    return car;
  }

  public async getCarById(carId: string) {
    if (!this.inputValidationService.getCarByIdInputIsValid(carId)) {
      throw new Error();
    }
    const carFromRepository = await this.carRepository.findById(carId);
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
    if (!this.inputValidationService.deleteCarByIdInputIsValid(carId)) {
      throw new Error();
    }
    await this.carRepository.delete(carId);

    return "deleted";
  }
}
