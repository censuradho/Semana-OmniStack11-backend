import { Router } from 'express'

import ongsController from '../controllers/ongsController'
import incidentsController from '../controllers/incidentController'

const routes = Router()

routes.post('/ongs', ongsController.store)
routes.get('/ongs', ongsController.index)

routes.post('/incidents', incidentsController.store)
routes.get('/incidents', incidentsController.index)
routes.delete('/incidents/:id', incidentsController.delete)

export default routes
