import express from "express";
// import cors from 'cors'

import { expressControllerAdapter } from "./expressControllerAdapter";
import { carController } from "../modules/car/index";

const router = express.Router();

router.get(
  "/health",
  (req, res) => {
    return res.send("alive");
  },
);

router.post(
  "/car",
  expressControllerAdapter((request) => {
    return carController.createCar(request);
  }),
);

router.get(
  "/car",
  expressControllerAdapter((request) => {
    return carController.listAllCars(request);
  }),
);

router.get(
  "/car/:carId",
  expressControllerAdapter((request) => {
    return carController.getCarById(request);
  }),
);

router.patch(
  "/car/:carId",
  expressControllerAdapter((request) => {
    return carController.updateCar(request);
  }),
);

router.delete(
  "/car/:carId",
  expressControllerAdapter((request) => {
    return carController.deleteCar(request);
  }),
);

export default router;
