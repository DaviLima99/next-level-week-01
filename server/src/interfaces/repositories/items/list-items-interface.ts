import { IItem } from "../../models/item";

export interface IListItemsRepository {
  find(): Promise<IItem[] | null>;
}