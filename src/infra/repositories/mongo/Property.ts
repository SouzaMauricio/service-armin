import { IPropertyRepository } from '../../../domain/infra/repositories/IProperty'
import PropertyModel from '../../database/mongo/mongoose/property'
import { Connection } from '../../database/mongo/mongoose/connections/Connection'

export class PropertyRepositoryMongo implements IPropertyRepository {
  async getUserEmailByPropertyId (propertyId: string): Promise<string | null> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await PropertyModel.findById(propertyId)
        .select('user')
        .populate('user', 'email')
        .lean() as any
      if (!response) return null
      return response.user.email
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }
}
