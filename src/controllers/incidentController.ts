import {  Request, Response, response } from 'express'

import connection from '../database/connection'

import Erros from '../Erros'

type Incidents = { ong_id: string }

export default {
  async store(req: Request, res: Response) {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization

    try {
      const [id] = await connection('incidents')
      .insert({ ong_id, description, value, title })

      return res.json({ _id: id})
    } catch (err) {
      console.log(err)
    }
  },
  async index(req: Request, res: Response) {
    const { page = 1 } = req.query

    const [count] = await connection('incidents').count()

    response.header('x-Total-Count', count['count(*)'])

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page -1) * 5)
    .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.city', 'ongs.uf' ])

    return res.json(incidents)
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params
    const ong_id = req.headers.authorization


    try {

      const incident: Incidents = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

      if (!incident) {
        return res.status(404).send()
      }
      
      if ( ong_id !== incident.ong_id) {
        return res.status(401).json({err: Erros.storeErros.NOT_AUTHORIZATION })
      }


      
      await connection('incidents')
      .where('id', id)
      .delete()

      return res.status(204).send()
    } catch (err) {
      console.log(err)
    }
  }
}