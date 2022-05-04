import { PropertyDAO } from '../../domain/dao/property'
import { notFound, ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class GetOneProperty {
  readonly propertyDAO: PropertyDAO

  constructor (propertyDAO: PropertyDAO) {
    this.propertyDAO = propertyDAO
  }

  async execute (propertyCod: string): Promise<HttpResponse> {
    try {
      const property = await this.propertyDAO.findByCod(propertyCod)
      if (property) return ok(property)
      return notFound('Property')
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
