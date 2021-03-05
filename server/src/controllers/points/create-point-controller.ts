import { IController } from "../../interfaces/controllers/controller-interface";
import { Request } from "express";
import { IResponseHandler } from "../../interfaces/responses/response-handler-interface";
import { createPointRepository } from "../../repositories/point/default-point-repository";

export class CreatePointController implements IController {
  constructor(
    private readonly responseHandler: IResponseHandler
  ) {}
  
  async handle(request: Request) {
    const { name, image, email, wpp, latitude, longitude, city, uf, items } = request.body;

    const data = { 
      name: this.sanitize(name),
      email: this.sanitize(email),
      image: this.sanitize(request.file.filename),
      wpp: this.sanitize(wpp),
      latitude: Number(latitude),
      longitude: Number(longitude),
      city: this.sanitize(city),
      uf: this.sanitize(uf),
    };

    const point = createPointRepository.create(data);
    return this.responseHandler.send(point);
  }

  private sanitize(value: any): string {
    return value;
  }
}