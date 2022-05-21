import express, { Request, Response } from 'express'
import { MakeAContactController } from '../presentation/controllers/MakeAContact'
import { GetAllContactsController } from '../presentation/controllers/GetAllContacts'
import { validateToken } from './verifyToken'

const routes = express()

routes.route('/contacts')
  .post(validateToken, async (req: Request, res: Response, next: any) => {
    const makeAContactController = new MakeAContactController()
    const response = await makeAContactController.handler(req.body)
    res.status(response.statusCode).send(response.body)
  })
  .get(async (req: Request, res: Response, next: any) => {
    const getAllContactsController = new GetAllContactsController()
    const response = await getAllContactsController.handler(req.query)
    res.status(response.statusCode).send(response.body)
  })

export {
  routes
}
