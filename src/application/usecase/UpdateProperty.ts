import { PropertyDAO } from '../../domain/dao/property'
import { APARTMENT, HOUSE_IN_CONDOMINIUM, PRIVATE_HOUSE, RELEASE } from '../../domain/enums/property-valid-types'
import { InvalidParamError } from '../../presentation/error/invalid-param-error'
import { badRequest, notFound, ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class UpdateProperty {
  readonly propertyDAO: PropertyDAO

  constructor (propertyDAO: PropertyDAO) {
    this.propertyDAO = propertyDAO
  }

  async execute (cod: string, body: any): Promise<HttpResponse> {
    try {
      const type = await this.propertyDAO.getPropertyTypeByCod(cod)
      if (!type) return notFound('Property')
      const validateBody = this.verifyBodyPropertiesByType(body, type)
      if (validateBody) return validateBody
      const response = await this.propertyDAO.updateOneByCod(cod, body)
      return ok(response)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }

  verifyBodyPropertiesByType (body: any, type: string): null | HttpResponse {
    switch (type) {
      case APARTMENT:
        return this.validateApartmentTypeProperty(body)
      case PRIVATE_HOUSE:
        return this.validatePrivateHouseTypeProperty(body)
      case HOUSE_IN_CONDOMINIUM:
        return this.validateHouseInCondominiumTypeProperty(body)
      case RELEASE:
        return this.validateReleaseTypeProperty(body)
      default:
        return badRequest(new InvalidParamError('type'))
    }
  }

  validateApartmentTypeProperty (body: any): null | HttpResponse {
    const invalidFields = [
      'release',
      'landArea',
      'views',
      'id',
      'cod',
      'type'
    ]
    const keys = Object.keys(body)
    for (const field of invalidFields) {
      if (!keys.includes(field)) continue
      return badRequest(new InvalidParamError(field))
    }
    if (body.toRent && (!body.price || body.price.rent)) return badRequest(new InvalidParamError('price.rent'))
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new InvalidParamError('price.sale'))
    return null
  }

  validatePrivateHouseTypeProperty (body: any): null | HttpResponse {
    const invalidFields = [
      'condominium',
      'release',
      'floor',
      'views',
      'id',
      'cod',
      'type'
    ]
    const keys = Object.keys(body)
    for (const field of invalidFields) {
      if (!keys.includes(field)) continue
      return badRequest(new InvalidParamError(field))
    }
    if (body.toRent && (!body.price || !body.price.rent)) return badRequest(new InvalidParamError('price.rent'))
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new InvalidParamError('price.sale'))
    return null
  }

  validateHouseInCondominiumTypeProperty (body: any): null | HttpResponse {
    const invalidFields = [
      'release',
      'floor',
      'views',
      'id',
      'cod',
      'type'
    ]
    const keys = Object.keys(body)
    for (const field of invalidFields) {
      if (!keys.includes(field)) continue
      return badRequest(new InvalidParamError(field))
    }
    if (body.toRent && (!body.price || !body.price.rent)) return badRequest(new InvalidParamError('price.rent'))
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new InvalidParamError('price.sale'))
    return null
  }

  validateReleaseTypeProperty (body: any): null | HttpResponse {
    const invalidFields = [
      'release',
      'floor',
      'views',
      'toRent',
      'id',
      'cod',
      'type'
    ]
    const keys = Object.keys(body)
    for (const field of invalidFields) {
      if (!keys.includes(field)) continue
      return badRequest(new InvalidParamError(field))
    }
    if (body.price && body.price.rent) return badRequest(new InvalidParamError('price.rent'))
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new InvalidParamError('price.sale'))
    return null
  }
}
