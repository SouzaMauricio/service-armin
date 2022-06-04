import { IUploadDAO } from '../../../domain/dao/IUpload'

export class UploadDAOFaker implements IUploadDAO {
  async create (): Promise<any> {
    return await new Promise((resolve, reject) => resolve(
      { _id: 'test', fullPath: 'test' }
    ))
  }
}
