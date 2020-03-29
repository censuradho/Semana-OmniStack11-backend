import {  Request, Response } from 'express'

import connection from '../database/connection'
import Err from '../Erros'

export default {
  async store(req: Request, res: Response) {
    const { id } = req.body
    
    const ong = await connection('ongs')
      .where('id', id)
      .first() // retorna apenas o primeiro, não um array com o prmeirro

      if (!ong) {
        return res.json({ err: Err.storeErros.USER_NOT_FOUND }).status(400)
      }

      return res.json(ong)
  }

}