import { IPropertyDAO } from '../../../domain/dao/IProperty'
import { Connection } from './mongoose/connections/Connection'
import PropertyModel from './mongoose/property'
import { OptionsPaginate } from './mongoose/OptionsPaginate'

export class PropertyDAOMongo implements IPropertyDAO {
  private readonly optionsPaginate: OptionsPaginate

  constructor () {
    this.optionsPaginate = new OptionsPaginate()
  }

  async findByCod (propertyCod: string): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await PropertyModel.findOne({ cod: propertyCod })
      return response
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async findById (propertyId: string): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await PropertyModel.findById(propertyId)
      return response
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async getPropertyTypeByCod (propertyCod: string): Promise<string | null> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await PropertyModel.findOne<any>({ cod: propertyCod })
        .select('type')
        .lean()
      return response?.type
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async updateOneByCod (propertyCod: string, body: any): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await PropertyModel.findOneAndUpdate<any>({ cod: propertyCod }, body, { new: true })
      return { id: response._id }
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async find (query, queryStringParams): Promise<any> {
    const connection = new Connection()
    const options = this.optionsPaginate.getOptionsPaginate(queryStringParams)
    try {
      if (query.bedrooms) {
        query.$and = query.$and ? query.$and : []
        const bedrooms = query.bedrooms >= 4 ? { $gte: query.bedrooms } : query.bedrooms
        query.$and.push(
          {
            $or: [
              {
                'environments.bedroom': bedrooms
              },
              {
                'release.units.bedroom': bedrooms
              }
            ]
          }
        )
        delete query.bedrooms
      }
      if (query.garages) {
        query.$and = query.$and ? query.$and : []
        const garages = query.garages >= 4 ? { $gte: query.garages } : query.garages
        query.$and.push(
          {
            $or: [
              {
                'environments.garages': garages
              },
              {
                'release.units.garages': garages
              }
            ]
          }
        )
        delete query.garages
      }
      if (query.minValue && query.toRent) {
        query['price.rent'] = { $gte: query.minValue }
        delete query.minValue
      } else if (query.minValue && query.toSell) {
        query['price.sale'] = { $gte: query.minValue }
        delete query.minValue
      }
      if (query.maxValue && query.toRent) {
        query['price.rent'] = query['price.rent'] ? { ...query['price.rent'], $lte: query.maxValue } : { $lte: query.maxValue }
        delete query.maxValue
      } else if (query.maxValue && query.toSell) {
        query['price.sale'] = query['price.sale'] ? { ...query['price.sale'], $lte: query.maxValue } : { $lte: query.maxValue }
        delete query.maxValue
      }
      if (query.search) {
        const regex = new RegExp(query.search, 'ig')
        query.keywords = { $regex: regex }
        delete query.search
      }
      console.log('===query===', query)
      await connection.createConnection()
      const response = await PropertyModel.paginate(query, options)
      return response
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async create (body: any): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await PropertyModel.create(body)
      return { id: response._id }
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async pushNewPicture (propertyId: string, body: any): Promise<void> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      await PropertyModel.updateOne(
        { _id: propertyId },
        { $push: { pictures: body } }
      )
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async removePicture (propertyId: string, uploadId: string): Promise<void> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      await PropertyModel.updateOne(
        { _id: propertyId },
        { $pull: { pictures: { uploadId } } }
      )
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }

  async addNewUnitImage (propertyId: string, unitTempId: number, body: any): Promise<void> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      await PropertyModel.updateOne(
        {
          _id: propertyId,
          'release.units.tempId': unitTempId
        },
        { $set: { 'release.units.$.image': body } }
      )
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }
}
