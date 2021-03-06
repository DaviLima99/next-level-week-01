import { IItem } from "../../../interfaces/models/item";
import { IListItemsRepository } from "../../../interfaces/repositories/items/list-items-interface";
import knex from '../../../database/connection';

export class ItemSqlRepository implements IListItemsRepository {
  private readonly table = 'items';

  async find(): Promise<IItem[] | null> {
    try {
      const items =  await knex(this.table).select('*');
      if (!items) return null;
      return items;
    } catch (error) {
      throw new Error("Erro ao buscar items!");
    }
  }
}