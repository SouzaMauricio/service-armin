import express, { Request, Response } from 'express'
import { AuthenticateUserController } from '../presentation/controllers/AuthenticateUser'

const routes = express()

routes.route('/login')
  .post(async (req: Request, res: Response, next: any) => {
    const authenticateUserController = new AuthenticateUserController()
    const response = await authenticateUserController.handler(req.body)
    res.status(response.statusCode).send(response.body)
  })

export {
  routes
}
