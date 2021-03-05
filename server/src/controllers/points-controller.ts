import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        const { uf, city, items } = request.query;
        
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.5:3333/uploads/${point.image}`
            }
        })

        return response.json(serializedPoints);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({
                message: 'Point not found!'
            })
        }

        const items = await knex('items')
            .join('point_items', 'item_id', '=', 'point_items.item_id')
            .where('point_items.point_id', id);

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.1.5:3333/uploads/${point.image}`
        };
    

        return response.status(200).json({point: serializedPoint, items});
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    async create(request: Request, response: Response) {
        const { name, image, email, wpp, latitude, longitude, city, uf, items } = request.body;

        try {
            const trx = await knex.transaction();

            const point = {
                name, email, image: request.file.filename, wpp, latitude, longitude, city, uf
            }
    
            const idInserteds = await trx('points').insert(point);
            
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

            trx.commit();
    
            return response.status(200).json({
                id: point_id,
                ...point,
            })
        } catch (error) {
            return response.status(400).json({
              error: 'Deuy ruim'
            })
        }
    }
}

export default PointsController;