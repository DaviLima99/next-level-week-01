import ICreatePointRepository from "../../interfaces/repositories/points/create-point-interface";
import { PointSqlRepository } from "./sql/point-sql-repository";

const pointSqlRepository = new PointSqlRepository();

const createPointRepository: ICreatePointRepository = pointSqlRepository;

export {
  createPointRepository
};