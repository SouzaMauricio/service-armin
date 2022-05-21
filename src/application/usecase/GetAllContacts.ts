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
        name = null,
        email = null
      } = queryStringParams
      const query: any = {}
      if (name) {
        query.name = name
      }
      if (email) {
        query.email = email
      }
      const response = await this.contactDAO.find(query, queryStringParams)
      return ok(response)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
