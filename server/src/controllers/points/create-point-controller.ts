import { IController } from "../../interfaces/controllers/controller-interface";
import { Request } from "express";
import { IResponseHandler } from "../../interfaces/responses/response-handler-interface";
import { createPointRepository } from "../../repositories/point/default-point-repository";
import { stringSanitizer } from "../../helpers/sanitizer/string-sanitizer";

export class CreatePointController implements IController {
  constructor(
    private readonly responseHandler: IResponseHandler
  ) {}
  
  async handle(request: Request) {
    const { name, email, wpp, latitude, longitude, city, uf, items } = request.body;

    const data = { 
      name: this.sanitize(name),
      email: this.sanitize(email),
      image: this.sanitize(request.file.filename),
      wpp: this.sanitize(wpp),
      latitude: Number(latitude),
      longitude: Number(longitude),
      city: this.sanitize(city),
      uf: this.sanitize(uf),
      items: this.sanitize(items),
      
    };

    const point = await createPointRepository.create(data);
    return this.responseHandler.send(point);
  }

  private sanitize(value: any): string {
    return stringSanitizer.sanitize(value);
  }
}