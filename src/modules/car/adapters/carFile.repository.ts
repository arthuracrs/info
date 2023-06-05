import fs from "fs";
import { promisify } from "util";
import { Car } from "../core/car.model";
import {
  ICarRepository,
  ICreateCarInput,
} from "../core/carRepository.port";
import { CarFromDbDto } from "../core/dto/carFromDbDto";

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

export class CarFileRepository implements ICarRepository {
  private readonly filename: string;
  private readonly encoding: BufferEncoding;

  constructor(filename: string, encoding: BufferEncoding = "utf-8") {
    this.filename = filename;
    this.encoding = encoding;
  }

  async create(carDataInput: ICreateCarInput): Promise<CarFromDbDto> {
    const cars = await this.readFile();
    const carId = carDataInput.carId;
    if (cars[carId]) {
      throw new Error(`Car with ID ${carId} already exists.`);
    }

    cars[carId] = carDataInput;
    await this.writeFile(cars);

    const returnCar = new CarFromDbDto(carDataInput);
    return returnCar;
  }

  async findById(carId: string): Promise<CarFromDbDto | undefined> {
    const cars = await this.readFile();
    const carData = cars[carId];

    if (!carData) {
      return undefined;
    }

    const returnCar = new CarFromDbDto(carData);
    return returnCar;
  }

  async findAll(): Promise<CarFromDbDto[]> {
    const cars = await this.readFile();

    const carList = Object.values(cars).map((carData) => {
      return new CarFromDbDto(carData);
    });

    return carList;
  }

  async update(
    carId: string,
    carData: Partial<Car>,
  ): Promise<CarFromDbDto | undefined> {
    const cars = await this.readFile();
    const existingCar = cars[carId];

    if (!existingCar) {
      return undefined;
    }

    const updatedCarData = { ...existingCar, ...carData };
    cars[carId] = updatedCarData;
    await this.writeFile(cars);

    const returnCar = new CarFromDbDto(updatedCarData);
    return returnCar;
  }

  async delete(carId: string): Promise<void> {
    const cars = await this.readFile();

    if (cars[carId]) {
      delete cars[carId];
      await this.writeFile(cars);
    }
  }

  private async readFile(): Promise<{ [carId: string]: ICreateCarInput }> {
    try {
      const fileData = await readFileAsync(this.filename, this.encoding);
      return JSON.parse(fileData);
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ERR_FS_FILE_TOO_LARGE") {
        return {};
      }
      throw error;
    }
  }

  private async writeFile(
    data: { [carId: string]: ICreateCarInput },
  ): Promise<void> {
    const jsonData = JSON.stringify(data);
    await writeFileAsync(this.filename, jsonData, this.encoding);
  }
}
