import { IPropertyDAO } from '../../../domain/dao/IProperty'
import PropertyModel from './mongoose/property'

export class PropertyDAOMongo implements IPropertyDAO {
  async create (body: any): Promise<any> {
    const response = await PropertyModel.create(body)
    return response
  }
}
