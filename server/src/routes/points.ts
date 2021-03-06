import { Router } from 'express';
import { CreatePointController } from '../controllers/points/create-point-controller';
import { GenericCreatedReponseHandler } from '../handlers/generic-response-handler';
import { routerHandler } from '../handlers/router-handler';
import multer from 'multer';
import multerConfig from '../config/multer';
import { celebrate, Joi } from 'celebrate';
import { IPoint } from '../interfaces/models/point';

export const pointRoutes = Router();

const updload = multer(multerConfig);
const responseHandler = new GenericCreatedReponseHandler<IPoint>();

//controllers
const createPointController = new CreatePointController(responseHandler);

pointRoutes.post('/points', updload.single('image'), celebrate({
  body: Joi.object().keys({
     name: Joi.string().required(),
     email: Joi.string().required().email(),
     uf: Joi.string().required().max(2),
     city: Joi.string().required(),
     latitude: Joi.number().required(),
     longitude: Joi.number().required(),
     items: Joi.string().required(),
  })
}), routerHandler(createPointController));

