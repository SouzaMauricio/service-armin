import { IContactUsDAO } from '../../domain/dao/IContactUs'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class GetAllContactUs {
  contactUsDAO: IContactUsDAO

  constructor (contactUsDAO: IContactUsDAO) {
    this.contactUsDAO = contactUsDAO
  }

  async execute (queryStringParams: any): Promise<HttpResponse> {
    try {
      const {
        fullName = null,
        email = null,
        type = null
      } = queryStringParams
      const query: any = {}
      if (fullName) {
        const regex = new RegExp(fullName, 'ig')
        query.fullName = regex
      }
      if (email) {
        query.email = email
      }
      if (type) {
        query.type = type
      }
      const response = await this.contactUsDAO.find(query, queryStringParams)
      return ok(response)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
