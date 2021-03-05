
import express, { response } from 'express';
import PointsController from "./controllers/points-controller"; 
import ItemsController from "./controllers/items-controller";
import multer from 'multer';
import multerConfig from './config/multer';

import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const updload = multer(multerConfig);

/* Instances */
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.post('/points', updload.single('image'), celebrate({
    body: Joi.object().keys({
       name: Joi.string().required(),
       email: Joi.string().required().email(),
       uf: Joi.string().required().max(2),
       city: Joi.string().required(),
       latitude: Joi.number().required(),
       longitude: Joi.number().required(),
       items: Joi.string().required(),
    })
}), pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);
routes.get('/items', itemsController.index);

export default routes;