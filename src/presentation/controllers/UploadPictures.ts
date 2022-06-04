import { UploadPictures } from '../../application/usecase/UploadPictures'
import { UploadDAOMongo } from '../../infra/database/mongo/Upload'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'
import { FilesServerFilesServerAWSGateway } from '../../infra/gateway/FilesServerAWS'

export class UploadPicturesController {
  async handler (body: any): Promise<any> {
    const uploadPictures = new UploadPictures(
      new UploadDAOMongo(),
      new PropertyDAOMongo(),
      new FilesServerFilesServerAWSGateway()
    )
    const response = await uploadPictures.execute(body)
    return response
  }
}
