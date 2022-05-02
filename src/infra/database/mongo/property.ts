import { PropertyDAO } from '../../../domain/dao/property'
import PropertyModel from './mongoose/property'

export class PropertyDAOMongo implements PropertyDAO {
  async create (body: any): Promise<any> {
    const response = await PropertyModel.create(body)
    return response
  }
}
