import express from "express";

import { expressControllerAdapter } from "./expressControllerAdapter";

export class AppRouter {
  private carController;
  public router;

  constructor(carModule) {
    this.carController = carModule.carController;
    this.router = express.Router();

    this.router.get(
      "/health",
      (req, res) => {
        return res.send("alive");
      },
    );

    this.router.post(
      "/car",
      expressControllerAdapter((request) => {
        return this.carController.createCar(request);
      }),
    );

    this.router.get(
      "/car",
      expressControllerAdapter((request) => {
        return this.carController.listAllCars(request);
      }),
    );

    this.router.get(
      "/car/:carId",
      expressControllerAdapter((request) => {
        return this.carController.getCarById(request);
      }),
    );

    this.router.patch(
      "/car/:carId",
      expressControllerAdapter((request) => {
        return this.carController.updateCar(request);
      }),
    );

    this.router.delete(
      "/car/:carId",
      expressControllerAdapter((request) => {
        return this.carController.deleteCar(request);
      }),
    );
  }
}
