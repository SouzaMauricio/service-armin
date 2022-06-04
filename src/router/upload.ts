import express, { Request, Response } from 'express'
import { UploadPicturesController } from '../presentation/controllers/UploadPictures'
import { validateToken } from './verifyToken'

const routes = express()

routes.route('/uploads')
  .post(validateToken, async (req: Request, res: Response, next: any) => {
    const uploadPicturesController = new UploadPicturesController()
    const response = await uploadPicturesController.handler(req.body)
    res.status(response.statusCode).send(response.body)
  })

export {
  routes
}
