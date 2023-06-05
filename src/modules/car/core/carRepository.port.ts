import { Car } from "./car.model";
import { CarFromDbDto } from "./dto/carFromDbDto";

export interface ICreateCarInput {
  carId: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;
}

export interface ICarRepository {
  create(carData: ICreateCarInput): Promise<CarFromDbDto>;
  findById(carId: string): Promise<CarFromDbDto | undefined>;
  findAll(): Promise<CarFromDbDto[]>;
  update(carId: string, carData: Partial<Car>): Promise<CarFromDbDto | undefined>;
  delete(carId: string): Promise<void>;
}
