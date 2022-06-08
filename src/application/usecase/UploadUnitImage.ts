import { IPropertyDAO } from '../../domain/dao/IProperty'
import { IUploadDAO } from '../../domain/dao/IUpload'
import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class UploadUnitImage {
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
      const newFileName = this.getNewFileName(body.fileType, body.propertyId, body.tempId)
      const { path, key } = await this.filesServerGateway.uploadFiles(body, newFileName, 'properties/units/')
      const newUpload = {
        originalName: body.fileName,
        fullPath: path,
        key
      }
      const upload = await this.uploadDAO.create(newUpload)
      await this.propertyDAO.addNewUnitImage(
        body.propertyId,
        body.tempId,
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

  getNewFileName (extension: string, propertyId: string, tempId: number): string {
    const dateToNameFile = new Date().toJSON().slice(0, 10).toString()
    return `${propertyId}-${tempId.toString()}-${dateToNameFile}.${extension}`
  }
}
