import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// middlewares
app.use(express.json())

app.get('/dev', (req: express.Request, res: express.Response) => {
  console.log(req.query)
  return res.json(req.query)
})

export default app
