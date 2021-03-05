import { IPoint } from "../../../interfaces/models/point";
import { PointRequestModel } from "../../../interfaces/models/request-model";
import ICreatePointRepository from "../../../interfaces/repositories/points/create-point-interface";
import knex from '../../../database/connection';

export class PointSqlRepository implements ICreatePointRepository{
  private readonly table = 'points';

  async create(request: PointRequestModel): Promise<IPoint | never> {
    const items = request.items;

    if (!items) {
      throw new Error("Ops items inválidos");
      
    }

    try {
      const point = await knex.transaction(async (trx) => {
        const idInserteds = await trx<IPoint>(this.table)
          .insert(request);

        const point_id = idInserteds[0];

        const pointItems = items
              .split(',')
              .map((item: string) => Number(item.trim()))
              .map((item_id: number )=> {
                  return {
                      item_id,
                      point_id
                  }
              });

        await trx('point_items').insert(pointItems);
        return idInserteds;
      });

      return {
        id: point[0],
        ...request
      };
    } catch (error) {
      throw new Error("Erro ao cadastrar ponto");
    }
  }
}