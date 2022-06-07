import { IPropertyDAO } from '../../domain/dao/IProperty'
import { IUploadDAO } from '../../domain/dao/IUpload'
import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class UploadPictures {
  private readonly uploadDAO: IUploadDAO
  private readonly propertyDAO: IPropertyDAO
  private readonly filesServerGateway: IFilesServer

  constructor (uploadDAO: IUploadDAO, propertyDAO: IPropertyDAO, filesServerGateway: IFilesServer) {
    this.uploadDAO = uploadDAO
    this.propertyDAO = propertyDAO
    this.filesServerGateway = filesServerGateway
  }

  async execute (body: any): Promise<HttpResponse> {
    try {
      const newFileName = this.getNewFileName(body.fileType, body.propertyId)
      const { path, key } = await this.filesServerGateway.uploadPropertyPictureFile(body, newFileName)
      const newUpload = {
        originalName: body.fileName,
        fullPath: path,
        key
      }
      const upload = await this.uploadDAO.create(newUpload)
      await this.propertyDAO.pushNewPicture(
        body.propertyId,
        {
          uploadId: upload.id,
          fullPath: path
        }
      )
      return ok(upload)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }

  getNewFileName (extension: string, propertyId: string): string {
    const randomPrefix = Math.random() * 10
    const dateToNameFile = new Date().toJSON().slice(0, 10).toString()
    return `${propertyId}-${dateToNameFile}-${randomPrefix.toString()}.${extension}`
  }
}
