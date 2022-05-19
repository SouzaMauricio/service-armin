import express, { Request, Response } from 'express'
import { AuthenticateUserController } from '../presentation/controllers/AuthenticateUser'

const routes = express()

routes.route('/login')
  .post(async (req: Request, res: Response, next) => {
    const authenticateUserController = new AuthenticateUserController()
    const response = await authenticateUserController.handler(req.body)
    res.send(response)
  })

export {
  routes
}
