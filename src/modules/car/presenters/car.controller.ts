import { Request, Response } from "../../../common/interfaces/Presenter.js";
import { ValidationServiceError } from "../core/car.errors.js";
import { CarService } from "../core/car.service.js";

export class CarController {
  private carService: CarService;

  constructor(carService: CarService) {
    this.carService = carService;
  }

  private errorHandler(error: Error) {
    console.log(error);

    if (error instanceof ValidationServiceError) {
      const response = new Response(
        400,
        {
          message: error.message,
        },
      );

      return response;
    }
    const response = new Response(
      500,
      {
        message: "internal server error",
      },
    );

    return response;
  }

  public async createCar(request: Request): Promise<Response> {
    try {
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

      const response = new Response(
        200,
        await this.carService.createCar(newCarInput),
      );

      console.timeEnd("CarController createCar ==================");
      return response;
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  public async getCarById(request: Request): Promise<Response> {
    try {
      console.time("CarController getCarById ==================");
      const { queryParameters, pathParameters, body } = request;

      const { carId } = pathParameters;

      const getCarByIdInput = carId;

      const response = new Response(
        200,
        await this.carService.getCarById(getCarByIdInput),
      );

      console.timeEnd("CarController getCarById ==================");
      return response;
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  public async listAllCars(request: Request): Promise<Response> {
    try {
      console.time("CarController listAllCars ==================");
      const { queryParameters, pathParameters, body } = request;

      const response = new Response(
        200,
        await this.carService.getAllCars(),
      );

      console.timeEnd("CarController listAllCars ==================");
      return response;
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  public async updateCar(request: Request): Promise<Response> {
    try {
      console.time("CarController updateCar ==================");
      const { queryParameters, pathParameters, body } = request;

      const { carId } = pathParameters;

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

      const response = new Response(
        200,
        await this.carService.updateCar(carId, updateCarDataInput),
      );

      console.timeEnd("CarController updateCar ==================");
      return response;
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  public async deleteCar(request: Request): Promise<Response> {
    try {
      console.time("CarController deleteCar ==================");
      const { queryParameters, pathParameters, body } = request;

      const { carId } = pathParameters;

      const response = new Response(
        200,
        await this.carService.deleteCarById(carId),
      );

      console.timeEnd("CarController deleteCar ==================");
      return response;
    } catch (error) {
      return this.errorHandler(error);
    }
  }
}
