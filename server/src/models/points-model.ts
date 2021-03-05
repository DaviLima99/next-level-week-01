import IModel from "../interfaces/model-interface";

export class Points implements IModel{
  find(): Promise<Object[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<Object> {
    throw new Error("Method not implemented.");
  }
  create(data: Object): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: number, data: Object): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}