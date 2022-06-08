import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'

export class FilesServerGatewayFaker implements IFilesServer {
  async uploadFiles (body: any, fileName: string, serverPath: string): Promise<string> {
    return await new Promise((resolve, reject) => resolve(
      'test'
    ))
  }

  async deleteFile (body: any): Promise<void> {
    return await new Promise((resolve, reject) => resolve(
    ))
  }
}
