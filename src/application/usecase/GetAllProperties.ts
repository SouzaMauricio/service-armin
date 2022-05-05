import { PropertyDAO } from '../../domain/dao/property'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class GetAllProperties {
  propertyDAO: PropertyDAO

  constructor (propertyDAO: PropertyDAO) {
    this.propertyDAO = propertyDAO
  }

  async execute (queryStringParams: any): Promise<HttpResponse> {
    try {
      const {
        page = 1,
        toRent = null,
        toSell = null
      } = queryStringParams
      const query: any = {}
      if (toRent && toRent === 'true') {
        query.toRent = true
      }
      if (toSell && toSell === 'true') {
        query.toSell = true
      }
      const response = await this.propertyDAO.find(query, page)
      return ok(response)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
