import { IResponseModel } from "./response-model-interface";

export interface IResponseHandler<T = any> {
  send(body: T): Promise<IResponseModel<T>>;
}
