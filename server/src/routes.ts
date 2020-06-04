
import express, { response } from 'express';
import PointsController from "./controllers/PointsController"; 
import ItemsController from "./controllers/ItemsController"; 

const routes = express.Router();

/* Instances */
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);
routes.get('/items', itemsController.index);

export default routes;