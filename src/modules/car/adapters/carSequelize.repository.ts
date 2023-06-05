import { ICarRepository, ICreateCarInput } from "../core/carRepository.port";
import { CarFromDbDto } from "../core/dto/carFromDbDto";
import { Car } from "../core/car.model";
import { CarRepositoryError } from "../core/car.errors";

export class CarPostgresRepository implements ICarRepository {
  private carSequelizeModel;
  constructor(carSequelizeModel) {
    this.carSequelizeModel = carSequelizeModel.model;
  }
  private errorHandler(error: Error) {
    console.log(error);
    throw new CarRepositoryError("CarPostgresRepository");
  }
  async create(carDataInput: ICreateCarInput): Promise<CarFromDbDto> {
    try {
      await this.carSequelizeModel.create({ ...carDataInput });

      const returnCar = new CarFromDbDto(carDataInput);

      return returnCar;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async findById(carId: string): Promise<CarFromDbDto | undefined> {
    try {
      const dbCar = await this.carSequelizeModel.findByPk(carId);
      const returnCar = new CarFromDbDto(dbCar);

      return returnCar;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async findAll(): Promise<CarFromDbDto[]> {
    try {
      const dbCars = await this.carSequelizeModel.findAll();

      return dbCars.map((item) => {
        const returnCar = new CarFromDbDto(item);

        return returnCar;
      });
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async update(
    carId: string,
    carData: Partial<Car>,
  ): Promise<CarFromDbDto | undefined> {
    try {
      await this.carSequelizeModel.update(carData, {
        where: { carId },
      });

      const dbCar = await this.carSequelizeModel.findByPk(carId);
      const returnCar = new CarFromDbDto(dbCar);

      return returnCar;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async delete(carId: string): Promise<void> {
    try {
      await this.carSequelizeModel.destroy({
        where: { carId },
      });
    } catch (error) {
      this.errorHandler(error);
    }
  }
}
