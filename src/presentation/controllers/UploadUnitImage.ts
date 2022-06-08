import { UploadUnitImage } from '../../application/usecase/UploadUnitImage'
import { UploadDAOMongo } from '../../infra/database/mongo/Upload'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'
import { FilesServerFilesServerAWSGateway } from '../../infra/gateway/FilesServerAWS'

export class UploadUnitImageController {
  async handler (body: any): Promise<any> {
    const uploadUnitImage = new UploadUnitImage(
      new UploadDAOMongo(),
      new PropertyDAOMongo(),
      new FilesServerFilesServerAWSGateway()
    )
    const response = await uploadUnitImage.execute(body)
    return response
  }
}
