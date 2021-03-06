import { Request } from "express";
import { IController } from "../../interfaces/controllers/controller-interface";
import { IResponseHandler } from "../../interfaces/responses/response-handler-interface";
import { listItemsRepository } from "../../repositories/item/default-item-repository";

export class ListItemsController implements IController {
  constructor(
    private readonly responseHandler: IResponseHandler
  ) {}

  async handle(request: Request) {
    const points = await listItemsRepository.find();
    return  this.responseHandler.send(points);
  }
}