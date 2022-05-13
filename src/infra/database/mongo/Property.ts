import { IPropertyDAO } from '../../../domain/dao/IProperty'
import { Connection } from './mongoose/connections/Connection'
import PropertyModel from './mongoose/property'

export class PropertyDAOMongo implements IPropertyDAO {
  findByCod: (propertyCod: string) => Promise<any>
  findById: (propertyCod: string) => Promise<any>
  getPropertyTypeByCod: (propertyCod: string) => Promise<string | null>
  updateOneByCod: (propertyCod: string, body: any) => Promise<any>
  find: (query: any, page: number) => Promise<any>

  async create (body: any): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await PropertyModel.create(body)
      return { id: response._id }
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }
}
