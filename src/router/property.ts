import express, { Request, Response } from 'express'
import { RegisterPropertyController } from '../presentation/controllers/RegisterProperty'
import { GetOnePropertyController } from '../presentation/controllers/GetOneProperty'
import { GetAllPropertiesController } from '../presentation/controllers/GetAllProperties'
import { UpdatePropertyController } from '../presentation/controllers/UpdateProperty'
import { validateToken, checkTokenProvider } from './verifyToken'

const routes = express()

routes.route('/properties')
  .post(validateToken, async (req: Request, res: Response, next: any) => {
    const registerPropertyController = new RegisterPropertyController()
    const response = await registerPropertyController.handler(req.body)
    if (response.statusCode !== 200) {
      res.status(response.statusCode).json(response.body)
    } else {
      res.status(response.statusCode).send(response.body)
    }
  })
  .get(checkTokenProvider, async (req: Request, res: Response, next: any) => {
    const getAllPropertiesController = new GetAllPropertiesController()
    const response = await getAllPropertiesController.handler(req.query)
    res.status(response.statusCode).send(response.body)
  })

routes.route('/properties/:cod')
  .patch(validateToken, async (req: Request, res: Response, next: any) => {
    const updatePropertyController = new UpdatePropertyController()
    const response = await updatePropertyController.handler(req.params.cod, req.body)
    res.status(response.statusCode).send(response.body)
  })
  .get(checkTokenProvider, async (req: Request, res: Response, next: any) => {
    const getOnePropertyController = new GetOnePropertyController()
    const response = await getOnePropertyController.handler(req.params.cod)
    res.status(response.statusCode).send(response.body)
  })

export {
  routes
}
