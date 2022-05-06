import { IPropertyDAO } from '../../domain/dao/IProperty'
import { notFound, ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class GetOneProperty {
  readonly propertyDAO: IPropertyDAO

  constructor (propertyDAO: IPropertyDAO) {
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
