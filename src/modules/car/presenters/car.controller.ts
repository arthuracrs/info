import { Request, Response } from "../../../common/interfaces/Presenter.js";
import { ValidationServiceError } from "../core/car.errors.js";
import { CarService } from "../core/car.service.js";

export class CarController {
  private carService: CarService;

  constructor(carService: CarService) {
    this.carService = carService;
  }

  public async createCar(request: Request): Promise<Response> {
    console.time("CarController createCar ==================");
    const { queryParameters, pathParameters, body } = request;

    const { placa, chassi, renavam, modelo, marca, ano } = body;
    const newCarInput = {
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
    };

    const response: Response = {
      statusCode: 200,
      body: await this.carService.createCar(newCarInput),
    };

    console.timeEnd("CarController createCar ==================");
    return response;
  }

  public async getCarById(request: Request): Promise<Response> {
    console.time("CarController getCarById ==================");
    const { queryParameters, pathParameters, body } = request;

    const { carId } = pathParameters;

    if (!carId) {
      const response: Response = {
        statusCode: 400,
        body: { message: "invalid input" },
      };
      return response;
    }

    const getCarByIdInput = carId;

    const response: Response = {
      statusCode: 200,
      body: await this.carService.getCarById(getCarByIdInput),
    };

    console.timeEnd("CarController getCarById ==================");
    return response;
  }

  public async listAllCars(request: Request): Promise<Response> {
    console.time("CarController listAllCars ==================");
    const { queryParameters, pathParameters, body } = request;

    const response: Response = {
      statusCode: 200,
      body: await this.carService.getAllCars(),
    };

    console.timeEnd("CarController listAllCars ==================");
    return response;
  }

  public async updateCar(request: Request): Promise<Response> {
    try {
      console.time("CarController updateCar ==================");
      const { queryParameters, pathParameters, body } = request;

      const { carId } = pathParameters;
      if (!carId) {
        const response: Response = {
          statusCode: 400,
          body: { message: "invalid input" },
        };
        return response;
      }

      const { placa, chassi, renavam, modelo, marca, ano } = body;
      const fieldsToUpdate = {
        placa,
        chassi,
        renavam,
        modelo,
        marca,
        ano,
      };

      const updateCarDataInput = Object.entries(fieldsToUpdate).reduce(
        (updateData, [key, value]) => {
          if (value !== false && value !== null && value !== undefined) {
            updateData[key] = value;
          }
          return updateData;
        },
        {},
      );

      const response: Response = {
        statusCode: 200,
        body: await this.carService.updateCar(carId, updateCarDataInput),
      };

      console.timeEnd("CarController updateCar ==================");
      return response;
    } catch (error) {
      if (error instanceof ValidationServiceError) {
        const response: Response = {
          statusCode: 400,
          body: {
            message: error.message
          },
        };

        return response
      }
    }
  }

  public async deleteCar(request: Request): Promise<Response> {
    console.time("CarController deleteCar ==================");
    const { queryParameters, pathParameters, body } = request;

    const { carId } = pathParameters;

    const response: Response = {
      statusCode: 200,
      body: await this.carService.deleteCarById(carId),
    };

    console.timeEnd("CarController deleteCar ==================");
    return response;
  }
}
