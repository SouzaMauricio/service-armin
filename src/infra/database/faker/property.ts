import { PropertyDAO } from '../../../domain/dao/property'

export class PropertyDAOFaker implements PropertyDAO {
  async create (body: any): Promise<any> {
    body.cod = 'NEW'
    body.id = '1234'
    return await new Promise((resolve, reject) => resolve(body))
  }
}
