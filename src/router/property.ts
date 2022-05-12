import express, { Request, Response } from 'express'
import { RegisterPropertyController } from '../presentation/controllers/RegisterPropery'

const routes = express()

routes.route('/property')
  .post(async (req: Request, res: Response, next) => {
    const registerPropertyController = new RegisterPropertyController()
    const response = await registerPropertyController.handler(req)
    res.send(response)
  })

export {
  routes
}
