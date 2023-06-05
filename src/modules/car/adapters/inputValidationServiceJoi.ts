import Joi from "joi";

import { IInputValidationService } from "../core/inputValidationService.port";
import { ValidationServiceError } from "../core/car.errors";

export class InputValidationServiceJoi implements IInputValidationService {
  createCarInputIsValid(carData: any): boolean {
    const schema = Joi.object({
      placa: Joi.string().min(7).max(30).required(),
      chassi: Joi.string().min(17).max(30).required(),
      renavam: Joi.string().min(11).max(30).required(),
      modelo: Joi.string().min(2).max(100).required(),
      marca: Joi.string().min(2).max(40).required(),
      ano: Joi.string().min(2).max(4).required(),
    });

    const result = schema.validate(carData);
    if (result.error) {
      throw new ValidationServiceError(result.error.message);
    }
    return true;
  }

  getCarByIdInputIsValid(carId: string): boolean {
    const schema = Joi.string().length(36).required();

    const result = schema.validate(carId);
    if (result.error) {
      throw new ValidationServiceError(result.error.message);
    }
    return true;
  }

  getAllCarsInputIsValid(): boolean {
    return true;
  }

  updateInputIsValid(carId: string, carData: any): boolean {
    const carIdSchema = Joi.string().length(36).required();
    const carDataSchema = Joi.object({
      placa: Joi.string().min(7).max(30),
      chassi: Joi.string().min(17).max(30),
      renavam: Joi.string().min(11).max(30),
      modelo: Joi.string().min(2).max(100),
      marca: Joi.string().min(2).max(40),
      ano: Joi.string().min(2).max(4),
    });

    const carDataResult = carDataSchema.validate(carData);
    const carIdResult = carIdSchema.validate(carId);

    if (carDataResult.error) {
      throw new ValidationServiceError(carDataResult.error.message);
    }
    if (carIdResult.error) {
      throw new ValidationServiceError(carIdResult.error.message);
    }
    return true;
  }

  deleteCarByIdInputIsValid(carId: string): boolean {
    const schema = Joi.string().length(36).required();

    const result = schema.validate(carId);
    if (result.error) {
      throw new ValidationServiceError(result.error.message);
    }
    return true;
  }
}
