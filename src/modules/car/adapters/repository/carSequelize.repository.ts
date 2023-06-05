import { CarSequelizeModel } from "./car.sequelizeModel";
import { ICarRepository, ICreateCarInput } from "../../core/carRepository.port";
import { CarFromDbDto } from "../../core/dto/carFromDbDto";
import { Car } from "../../core/car.model";

export class CarPostgresRepository implements ICarRepository {
  async create(carDataInput: ICreateCarInput): Promise<CarFromDbDto> {
    await CarSequelizeModel.create({ ...carDataInput });

    const returnCar = new CarFromDbDto(carDataInput);

    return returnCar;
  }

  async findById(carId: string): Promise<CarFromDbDto | undefined> {
    const dbCar = await CarSequelizeModel.findByPk(carId);
    const returnCar = new CarFromDbDto(dbCar);

    return returnCar;
  }

  async findAll(): Promise<CarFromDbDto[]> {
    const dbCars = await CarSequelizeModel.findAll();

    return dbCars.map((item) => {
      const returnCar = new CarFromDbDto(item);

      return returnCar;
    });
  }

  async update(
    carId: string,
    carData: Partial<Car>,
  ): Promise<CarFromDbDto | undefined> {
    await CarSequelizeModel.update(carData, {
      where: { carId },
    });

    const dbCar = await CarSequelizeModel.findByPk(carId);
    const returnCar = new CarFromDbDto(dbCar);

    return returnCar;
  }

  async delete(carId: string): Promise<void> {
    await CarSequelizeModel.destroy({
      where: { carId },
    });
  }
}
