import { Router, Request, Response } from 'express'
import crypto from 'crypto'

import connection from '../database/connection'

export default {
  async store(req: Request, res: Response) {
    const { name, email, whatsapp, uf, city } = req.body
  
    const id = crypto.randomBytes(4).toString('HEX')
  
    try {
      await connection('ongs')
      .insert({ id, name, email, whatsapp, city, uf })

      return res.json({ _id: id })
      
    } catch (err) {
      console.log(err)
    }
  },

  async index(req: Request, res: Response) {
    const ongs = await connection('ongs').select('*')

    return res.json(ongs)
  }
}
