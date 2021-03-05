import Knex from "knex";
import { IPoint } from "../../../interfaces/models/point";
import { PointRequestModel } from "../../../interfaces/models/request-model";
import ICreatePointRepository from "../../../interfaces/repositories/points/create-point-interface";

export class PointSqlRepository implements ICreatePointRepository{
  private readonly table = 'points';

  async create(request: PointRequestModel): Promise<IPoint | never> {
    try {
      const point = await Knex<IPoint>(this.table)
        .insert(request)
        .returning('id');
  
        return {
          id: point[0],
          ...request
        };
    } catch (error) {
      throw new Error("Erro ao cadastrar ponto");
    }
  }
}