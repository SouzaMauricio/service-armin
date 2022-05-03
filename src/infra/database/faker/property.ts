import { PropertyDAO } from '../../../domain/dao/property'

export class PropertyDAOFaker implements PropertyDAO {
  async create (body: any): Promise<any> {
    body.cod = 'NEW'
    body.id = '1234'
    return await new Promise((resolve, reject) => resolve(body))
  }

  async findByCod (propertyCod: string): Promise<any> {
    switch (propertyCod) {
      case 'COD1':
        return await new Promise((resolve, reject) => resolve({
          cod: 'COD1',
          title: 'Property 1'
        }))
      default:
        return await new Promise((resolve, reject) => resolve(null))
    }
  }
}
