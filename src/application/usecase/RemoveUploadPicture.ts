import { IPropertyDAO } from '../../domain/dao/IProperty'
import { IUploadDAO } from '../../domain/dao/IUpload'
import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'
import { notFound, ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class RemoveUploadPicture {
  private readonly uploadDAO: IUploadDAO
  private readonly propertyDAO: IPropertyDAO
  private readonly filesServerGateway: IFilesServer

  constructor (uploadDAO: IUploadDAO, propertyDAO: IPropertyDAO, filesServerGateway: IFilesServer) {
    this.uploadDAO = uploadDAO
    this.propertyDAO = propertyDAO
    this.filesServerGateway = filesServerGateway
  }

  async execute (uploadId: string, propertyId: string): Promise<HttpResponse> {
    try {
      const upload = await this.uploadDAO.findById(uploadId)
      if (!upload) return notFound('Upload')
      await this.filesServerGateway.deleteFile(upload.key)
      const uploadDeleted = await this.uploadDAO.deleteOne(upload.id)
      await this.propertyDAO.removePicture(
        propertyId,
        upload.id
      )
      return ok(uploadDeleted)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
