import { IListItemsRepository } from "../../interfaces/repositories/items/list-items-interface";
import { ItemSqlRepository } from "./sql/item-sql-repository";

const itemSqlRepository = new ItemSqlRepository();

const listItemsRepository: IListItemsRepository = itemSqlRepository;

export {
  listItemsRepository
};