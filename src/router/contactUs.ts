import express, { Request, Response } from 'express'
import { MakeAContactUsController } from '../presentation/controllers/MakeAContactUs'
import { GetAllContactUsController } from '../presentation/controllers/GetAllContactUs'
import { validateToken, checkTokenProvider } from './verifyToken'

const routes = express()

routes.route('/contactUs')
  .post(validateToken, async (req: Request, res: Response, next: any) => {
    const makeAContactUsController = new MakeAContactUsController()
    const response = await makeAContactUsController.handler(req.body)
    res.status(response.statusCode).send(response.body)
  })
  .get(checkTokenProvider, async (req: Request, res: Response, next: any) => {
    const getAllContactUsController = new GetAllContactUsController()
    const response = await getAllContactUsController.handler(req.query)
    res.status(response.statusCode).send(response.body)
  })

export {
  routes
}
