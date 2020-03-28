import { Router } from 'express'

import ongsController from '../controllers/ongsController'
import incidentsController from '../controllers/incidentController'
import profileController from '../controllers/ProfileController'
import sessionController from '../controllers/sessionController'

const routes = Router()

routes.post('/ongs', ongsController.store)
routes.get('/ongs', ongsController.index)

routes.post('/incidents', incidentsController.store)
routes.get('/incidents', incidentsController.index)
routes.delete('/incidents/:id', incidentsController.delete)

routes.get('/profile', profileController.index)

routes.post('/session', sessionController.store)

export default routes
