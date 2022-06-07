import { IContactDAO } from '../../domain/dao/IContact'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class GetAllContacts {
  contactDAO: IContactDAO

  constructor (contactDAO: IContactDAO) {
    this.contactDAO = contactDAO
  }

  async execute (queryStringParams: any): Promise<HttpResponse> {
    try {
      const {
        fullName = null,
        email = null,
        property = null
      } = queryStringParams
      const query: any = {}
      if (fullName) {
        const regex = new RegExp(fullName, 'ig')
        query.fullName = regex
      }
      if (email) {
        query.email = email
      }
      if (property) {
        query.property = property
      }
      const response = await this.contactDAO.find(query, queryStringParams)
      return ok(response)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
