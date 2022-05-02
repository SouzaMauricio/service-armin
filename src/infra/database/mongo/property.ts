import { PropertyDAO } from '../../../domain/dao/property'

export class PropertyDAOMongo implements PropertyDAO {
  async create (body: any): Promise<any> {
    return await new Promise((resolve, reject) => true)
  }
}
