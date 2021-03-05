import { IResponseHandler } from "../interfaces/responses/response-handler-interface";
import { IResponseModel } from "../interfaces/responses/response-model-interface";

import HTTP from '../config/http';

export class GenericCreatedReponseHandler<T> implements IResponseHandler {
  async send(body: T): Promise<IResponseModel<T>> {
    return {
      statusCode: HTTP.CREATED,
      body
    };
  }
}