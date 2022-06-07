import express, { Request, Response } from 'express'
import { RemoveUploadPictureController } from '../presentation/controllers/RemoveUploadPicture'
import { UploadPicturesController } from '../presentation/controllers/UploadPictures'
import { validateToken } from './verifyToken'

const routes = express()

routes.route('/uploads')
  .post(validateToken, async (req: Request, res: Response, next: any) => {
    const uploadPicturesController = new UploadPicturesController()
    const response = await uploadPicturesController.handler(req.body)
    res.status(response.statusCode).send(response.body)
  })

routes.route('/uploads/:uploadId')
  .delete(validateToken, async (req: Request, res: Response, next: any) => {
    const propertyId = req.query.propertyId as string
    const removeUploadPictureController = new RemoveUploadPictureController()
    const response = await removeUploadPictureController.handler(req.params.uploadId, propertyId)
    res.status(response.statusCode).send(response.body)
  })

export {
  routes
}
