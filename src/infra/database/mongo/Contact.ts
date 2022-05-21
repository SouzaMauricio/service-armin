import { IContactDAO } from '../../../domain/dao/IContact'
import { Connection } from './mongoose/connections/Connection'
import ContactModel from './mongoose/contact'
import { OptionsPaginate } from './mongoose/OptionsPaginate'

export class ContactDAOMongo implements IContactDAO {
  private readonly optionsPaginate: OptionsPaginate

  constructor () {
    this.optionsPaginate = new OptionsPaginate()
  }

  async find (query, queryStringParams): Promise<any> {
    const connection = new Connection()
    const options = this.optionsPaginate.getOptionsPaginate(queryStringParams)
    try {
      if (query.name) {
        query.name = RegExp(query.name, 'gi')
      }
      await connection.createConnection()
      const response = await ContactModel.paginate(query, options)
      return response
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async create (body: any): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await ContactModel.create(body)
      return { id: response._id }
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }
}
