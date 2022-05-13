import { InvalidParamError, MissingParamError } from '../../presentation/error'
import { ok, badRequest, serverError } from '../../presentation/helpers/http-helper'
import {
  APARTMENT,
  PRIVATE_HOUSE,
  HOUSE_IN_CONDOMINIUM,
  RELEASE
} from '../../domain/enums/property-valid-types'
import { HttpResponse } from '../../presentation/protocols'
import { IPropertyDAO } from '../../domain/dao/IProperty'
import { ICountDAO } from '../../domain/dao/ICount'

export class RegisterProperty {
  propertyDAO: IPropertyDAO
  countDAO: ICountDAO

  constructor (propertyDAO: IPropertyDAO, countDAO: ICountDAO) {
    this.propertyDAO = propertyDAO
    this.countDAO = countDAO
  }

  async execute (body: any): Promise<HttpResponse> {
    try {
      const verifyBodyPropertiesByType = this.verifyBodyPropertiesByType(body, body.type)
      if (verifyBodyPropertiesByType) return verifyBodyPropertiesByType
      body.cod = await this.getNextCod(body.type)
      const data = await this.propertyDAO.create(body)
      return ok({ id: data.id })
    } catch (error) {
      console.error('Error: ', error)
      return serverError()
    }
  }

  private async getNextCod (type: string): Promise<string> {
    const prefix = this.getPrefixByType(type)
    const date = this.getDateFormatted()
    const nextCod = await this.countDAO.getNextCod()
    return prefix + date + nextCod.toString()
  }

  private getPrefixByType (type: string): string {
    switch (type) {
      case APARTMENT:
        return 'AP'
      case PRIVATE_HOUSE:
        return 'PP'
      case HOUSE_IN_CONDOMINIUM:
        return 'HC'
      case RELEASE:
        return 'RL'
      default:
        return 'INVALID_'
    }
  }

  private getDateFormatted (): string {
    const currentDate = new Date().toISOString().slice(0, 10)
    const [year, month] = currentDate.split('-')
    return year.slice(-2) + month
  }

  verifyBodyPropertiesByType (body, type): null | HttpResponse {
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
    // required fields
    const requiredSimpleFields = [
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
    const keys = Object.keys(body)
    for (const field of requiredSimpleFields) {
      if (keys.includes(field)) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toRent && (!body.price || !body.price.rent)) return badRequest(new MissingParamError('price.rent'))
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.release) badRequest(new InvalidParamError('release'))
    if (body.landArea) badRequest(new InvalidParamError('landArea'))
    if (body.views) badRequest(new InvalidParamError('views'))
    return null
  }

  validatePrivateHouseTypeProperty (body: any): null | HttpResponse {
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
    const keys = Object.keys(body)
    for (const field of requiredSimpleFields) {
      if (keys.includes(field)) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toRent && (!body.price || !body.price.rent)) return badRequest(new MissingParamError('price.rent'))
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.condominium) badRequest(new InvalidParamError('condominium'))
    if (body.release) badRequest(new InvalidParamError('release'))
    if (body.floor) badRequest(new InvalidParamError('floor'))
    if (body.views) badRequest(new InvalidParamError('views'))
    return null
  }

  validateHouseInCondominiumTypeProperty (body: any): null | HttpResponse {
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
    const keys = Object.keys(body)
    for (const field of requiredSimpleFields) {
      if (keys.includes(field)) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toRent && (!body.price || !body.price.rent)) return badRequest(new MissingParamError('price.rent'))
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.release) badRequest(new InvalidParamError('release'))
    if (body.floor) badRequest(new InvalidParamError('floor'))
    if (body.views) badRequest(new InvalidParamError('views'))
    return null
  }

  validateReleaseTypeProperty (body: any): null | HttpResponse {
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
    const keys = Object.keys(body)
    for (const field of requiredSimpleFields) {
      if (keys.includes(field)) continue
      return badRequest(new MissingParamError(field))
    }
    if (body.toSell && (!body.price || !body.price.sale)) return badRequest(new MissingParamError('price.sale'))
    if (!body.pictures[0]) return badRequest(new MissingParamError('picture'))
    // invalid fields
    if (body.floor) badRequest(new InvalidParamError('floor'))
    if (body.views) badRequest(new InvalidParamError('views'))
    if (body.toRent) badRequest(new InvalidParamError('toRent'))
    if (body.price.rent) badRequest(new InvalidParamError('price.rent'))
    return null
  }
}
