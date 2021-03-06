import { Request } from 'express';
import { IResponseModel } from '../responses/response-model-interface';

export interface IController<T = unknown> {
  handle(request: Request): Promise<IResponseModel<T>>;
}