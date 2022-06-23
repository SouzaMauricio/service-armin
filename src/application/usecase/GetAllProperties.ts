import { IPropertyDAO } from '../../domain/dao/IProperty'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class GetAllProperties {
  propertyDAO: IPropertyDAO

  constructor (propertyDAO: IPropertyDAO) {
    this.propertyDAO = propertyDAO
  }

  async execute (queryStringParams: any): Promise<HttpResponse> {
    try {
      const {
        show = null,
        toRent = null,
        toSell = null,
        bedrooms = null,
        garages = null,
        search = null,
        minValue = null,
        maxValue = null,
        type = null
      } = queryStringParams
      const query: any = {}
      if (show && show === 'true') {
        query.show = true
      }
      if (show && show === 'false') {
        query.show = false
      }
      if (toRent && toRent === 'true') {
        query.toRent = true
      }
      if (toRent && toRent === 'false') {
        query.toRent = false
      }
      if (toSell && toSell === 'true') {
        query.toSell = true
      }
      if (toSell && toSell === 'false') {
        query.toSell = false
      }
      if (bedrooms) {
        query.bedrooms = bedrooms
      }
      if (garages) {
        query.garages = garages
      }
      if (search) {
        query.search = search
      }
      if (minValue) {
        query.minValue = parseFloat(minValue)
      }
      if (maxValue) {
        query.maxValue = parseFloat(maxValue)
      }
      if (type) {
        query.type = type.toUpperCase()
      }
      const response = await this.propertyDAO.find(query, queryStringParams)
      return ok(response)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
