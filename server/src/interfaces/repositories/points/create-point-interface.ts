import { IPoint } from "../../models/point";
import { PointRequestModel } from "../../models/request-model";

export default interface ICreatePointRepository {
  create(request: PointRequestModel): Promise<IPoint | never>;
}