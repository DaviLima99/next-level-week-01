import { NextFunction, Request, Response } from "express";
import { IController } from "../interfaces/controllers/controller-interface";

export const routerHandler = <T>(controller: IController<T>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      controller.handle(request),
    ).then((controllerResponse) => {
        response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body);
        return next();
      })
      .catch((error: Error) => {
        return next(error);
      });
  };
};