export interface IInputValidationService {
  createCarInputIsValid(carData: any): boolean;
  getCarByIdInputIsValid(carId: string): boolean;
  getAllCarsInputIsValid(): boolean;
  updateInputIsValid(carId: string, carData: any): boolean;
  deleteCarByIdInputIsValid(carId: string): boolean;
}
