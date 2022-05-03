import { PropertyDAO } from '../../domain/dao/property'
import { NotFoundError } from '../../presentation/error/not-found-error'
import { notFound, ok } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class GetOneProperty {
  readonly propertyDAO: PropertyDAO

  constructor (propertyDAO: PropertyDAO) {
    this.propertyDAO = propertyDAO
  }

  async execute (propertyCod: string): Promise<HttpResponse> {
    const property = await this.propertyDAO.findByCod(propertyCod)
    if (property) return ok(property)
    return notFound(new NotFoundError('cod'))
  }
}
