import { RemoveUploadPicture } from '../../application/usecase/RemoveUploadPicture'
import { UploadDAOMongo } from '../../infra/database/mongo/Upload'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'
import { FilesServerFilesServerAWSGateway } from '../../infra/gateway/FilesServerAWS'

export class RemoveUploadPictureController {
  async handler (uploadId: string, propertyId: string): Promise<any> {
    const removeUploadPicture = new RemoveUploadPicture(
      new UploadDAOMongo(),
      new PropertyDAOMongo(),
      new FilesServerFilesServerAWSGateway()
    )
    const response = await removeUploadPicture.execute(uploadId, propertyId)
    return response
  }
}
