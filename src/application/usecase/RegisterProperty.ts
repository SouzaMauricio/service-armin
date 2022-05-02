import { InvalidParamError, MissingParamError } from '../../presentation/error'
import { ok, badRequest } from '../../presentation/helpers/http-helper'
import {
  APARTMENT,
  PRIVATE_HOUSE,
  HOUSE_IN_CONDOMINIUM,
  RELEASE
} from '../../domain/enums/property-valid-types'
import { HttpResponse } from '../../presentation/protocols'
import { PropertyDAO } from '../../domain/dao/property'

export class RegisterProperty {
  propertyDAO: PropertyDAO

  constructor (propertyDAO: PropertyDAO) {
    this.propertyDAO = propertyDAO
  }

  async execute (body: any): Promise<HttpResponse> {
    const verifyBodyPropertiesByType = this.verifyBodyPropertiesByType(body, body.type)
    if (verifyBodyPropertiesByType) return verifyBodyPropertiesByType
    const data = await this.propertyDAO.create(body)
    return ok(data)
  }

  verifyBodyPropertiesByType (body, type): any {
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

  validateApartmentTypeProperty (body): any {
    // required fields
    const requiredSimpleFields = [
      'floor',
      'propertyArea',
      'user',
      'toRent',
      'toSell',
      'brokerName',
      'show',
      'condominium',
      'price',
      'localization',
      'environments',
      'pictures'
    ]
    for (const field of requiredSimpleFields) {
      if (body[field]) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toRent && !body.price.rent) return badRequest(new MissingParamError('price.rent'))
    if (body.toSell && !body.price.sale) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.release) badRequest(new InvalidParamError('release'))
    if (body.landArea) badRequest(new InvalidParamError('landArea'))
    if (body.views) badRequest(new InvalidParamError('views'))
    return null
  }

  validatePrivateHouseTypeProperty (body): any {
    // required fields
    const requiredSimpleFields = [
      'propertyArea',
      'landArea',
      'user',
      'toRent',
      'toSell',
      'brokerName',
      'show',
      'price',
      'localization',
      'environments',
      'pictures'
    ]
    for (const field of requiredSimpleFields) {
      if (body[field]) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toRent && !body.price.rent) return badRequest(new MissingParamError('price.rent'))
    if (body.toSell && !body.price.sale) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.release) badRequest(new InvalidParamError('release'))
    if (body.floor) badRequest(new InvalidParamError('floor'))
    if (body.views) badRequest(new InvalidParamError('views'))
    return null
  }

  validateHouseInCondominiumTypeProperty (body): any {
    // required fields
    const requiredSimpleFields = [
      'propertyArea',
      'landArea',
      'user',
      'toRent',
      'toSell',
      'brokerName',
      'show',
      'condominium',
      'price',
      'localization',
      'environments',
      'pictures'
    ]
    for (const field of requiredSimpleFields) {
      if (body[field]) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toRent && !body.price.rent) return badRequest(new MissingParamError('price.rent'))
    if (body.toSell && !body.price.sale) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.release) badRequest(new InvalidParamError('release'))
    if (body.floor) badRequest(new InvalidParamError('floor'))
    if (body.views) badRequest(new InvalidParamError('views'))
    return null
  }

  validateReleaseTypeProperty (body): any {
    // required fields
    const requiredSimpleFields = [
      'propertyArea',
      'user',
      'toSell',
      'brokerName',
      'show',
      'condominium',
      'price',
      'localization',
      'environments',
      'pictures',
      'release'
    ]
    for (const field of requiredSimpleFields) {
      if (body[field]) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toSell && !body.price.sale) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.floor) badRequest(new InvalidParamError('floor'))
    if (body.views) badRequest(new InvalidParamError('views'))
    if (body.price.rent) badRequest(new InvalidParamError('price.rent'))
    return null
  }
}
