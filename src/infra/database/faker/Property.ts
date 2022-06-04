import { IPropertyDAO } from '../../../domain/dao/IProperty'
import { APARTMENT, PRIVATE_HOUSE, HOUSE_IN_CONDOMINIUM, RELEASE } from '../../../domain/enums/property-valid-types'

export class PropertyDAOFaker implements IPropertyDAO {
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

  async findById (propertyCod: string): Promise<any> {
    switch (propertyCod) {
      case '1':
        return await new Promise((resolve, reject) => resolve({
          cod: '1',
          title: 'Property 1'
        }))
      default:
        return await new Promise((resolve, reject) => resolve(null))
    }
  }

  async getPropertyTypeByCod (propertyCod: string): Promise<string | null> {
    switch (propertyCod) {
      case 'COD1':
        return await new Promise((resolve, reject) => resolve(APARTMENT))
      case 'COD2':
        return await new Promise((resolve, reject) => resolve(PRIVATE_HOUSE))
      case 'COD3':
        return await new Promise((resolve, reject) => resolve(HOUSE_IN_CONDOMINIUM))
      case 'COD4':
        return await new Promise((resolve, reject) => resolve(RELEASE))
      default:
        return await new Promise((resolve, reject) => resolve(null))
    }
  }

  async updateOneByCod (propertyCod: string, body: any): Promise<any | null> {
    switch (propertyCod) {
      case 'COD1':
        return await new Promise((resolve, reject) => resolve({ cod: propertyCod }))
    }
  }

  async find (query: any, page: number): Promise<any | []> {
    return [
      {
        cod: 'COD1',
        toRent: true,
        toSell: true
      },
      {
        cod: 'COD2',
        toRent: true,
        toSell: true
      },
      {
        cod: 'COD3',
        toRent: false,
        toSell: true
      },
      {
        cod: 'COD4',
        toRent: false,
        toSell: true
      }
    ]
  }

  async pushNewPicture (propertyId: string, body: any): Promise<void> {}
}
