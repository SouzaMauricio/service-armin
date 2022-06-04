import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'

export class FilesServerGatewayFaker implements IFilesServer {
  async uploadPropertyPictureFile (body: any): Promise<string> {
    return await new Promise((resolve, reject) => resolve(
      'test'
    ))
  }
}
