import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    /**
     * 
     * @param request 
     * @param response 
     */
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

        return response.json(points);
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

        return response.status(200).json(point);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    async create(request: Request, response: Response) {
        const { name, email, wpp, latitude, longitude, city, uf, items } = request.body;

        try {
            const trx = await knex.transaction();

            const point = {
                name, image: 'image-fake', email, wpp, latitude, longitude, city, uf
            }
    
            const idInserteds = await trx('points').insert(point);
            
            const point_id = idInserteds[0];
        
            const pointItems = items.map((item_id: number )=> {
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