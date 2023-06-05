import { Request, Response, NextFunction} from "express";

import { handler } from "../common/interfaces/Presenter.js";

export const expressControllerAdapter = (controllerFn: handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const controllerFnReq = {
        queryParameters: req.query,
        pathParameters: req.params,
        body: req.body
      }

      const result = await controllerFn(controllerFnReq);

      res.status(result?.statusCode).json(result?.body);
    } catch (error) {
      next(error);
    }
  };
};
