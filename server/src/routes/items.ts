import { Router } from "express";
import { ListItemsController } from "../controllers/items/list-item-controller";
import { GenericCreatedReponseHandler } from "../handlers/generic-response-handler";
import { routerHandler } from "../handlers/router-handler";
import { IItem } from "../interfaces/models/item";

export const itemsRouter = Router();


const responseHandler = new GenericCreatedReponseHandler<IItem>();

const listItemsController = new ListItemsController(responseHandler);

itemsRouter.get('/items', routerHandler(listItemsController));