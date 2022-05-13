import express, { Request, Response } from 'express'
import { RegisterPropertyController } from '../presentation/controllers/RegisterProperty'
import { GetOnePropertyController } from '../presentation/controllers/GetOneProperty'
import { GetAllPropertiesController } from '../presentation/controllers/GetAllProperties'
import { UpdatePropertyController } from '../presentation/controllers/UpdateProperty'

const routes = express()

routes.route('/property')
  .post(async (req: Request, res: Response, next) => {
    const registerPropertyController = new RegisterPropertyController()
    const response = await registerPropertyController.handler(req.body)
    res.send(response)
  })
  .get(async (req: Request, res: Response, next) => {
    const getAllPropertiesController = new GetAllPropertiesController()
    const response = await getAllPropertiesController.handler(req.query)
    res.send(response)
  })

routes.route('/property/:cod')
  .patch(async (req: Request, res: Response, next) => {
    const updatePropertyController = new UpdatePropertyController()
    const response = await updatePropertyController.handler(req.params.cod, req.body)
    res.send(response)
  })
  .get(async (req: Request, res: Response, next) => {
    const getOnePropertyController = new GetOnePropertyController()
    const response = await getOnePropertyController.handler(req.params.cod)
    res.send(response)
  })
export {
  routes
}
