import { ICountDAO } from '../../../domain/dao/ICount'
import { Connection } from './mongoose/connections/Connection'
import CountModel from './mongoose/count'

export class CountDAOMongo implements ICountDAO {
  private readonly COD_COUNT_PROPERTY = 'properties-count'

  async getNextCod (): Promise<number> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await CountModel.findOneAndUpdate<any>(
        {
          cod: this.COD_COUNT_PROPERTY
        },
        {
          $inc: { propertySequence: 1 }
        },
        {
          new: true,
          upsert: true
        }
      ).lean()
      return response.propertySequence
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }
}
