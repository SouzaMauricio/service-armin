import { IContactDAO } from '../../../domain/dao/IContact'

export class ContactDAOFaker implements IContactDAO {
  async find (query: any, page: number): Promise<any | []> {
    return [
      {
        id: '1',
        toRent: true,
        toSell: true
      },
      {
        id: '2',
        toRent: true,
        toSell: true
      },
      {
        id: '3',
        toRent: true,
        toSell: true
      }
    ]
  }

  async create (body: any): Promise<any> {
    return await new Promise((resolve, reject) => resolve({
      id: 'test'
    }))
  }
}
