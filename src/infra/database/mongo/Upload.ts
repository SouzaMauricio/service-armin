import { IUploadDAO } from '../../../domain/dao/IUpload'
import { Connection } from './mongoose/connections/Connection'
import UploadModel from './mongoose/upload'
import { OptionsPaginate } from './mongoose/OptionsPaginate'

export class UploadDAOMongo implements IUploadDAO {
  private readonly optionsPaginate: OptionsPaginate

  constructor () {
    this.optionsPaginate = new OptionsPaginate()
  }

  async create (body: any): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await UploadModel.create(body)
      return { id: response._id }
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      // await connection.closeConnection()
    }
  }

  async findById (uploadId: string): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await UploadModel.findById(uploadId)
      return response
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      // await connection.closeConnection()
    }
  }

  async deleteOne (uploadId: string): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await UploadModel.findByIdAndDelete<any>(uploadId)
      return { id: response._id }
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      // await connection.closeConnection()
    }
  }
}
