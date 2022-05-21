import { IGeneralConfigDAO } from '../../../domain/dao/IGeneralConfigDAO'
import { Connection } from './mongoose/connections/Connection'
import GeneralConfigModel from './mongoose/generalConfig'

export class GeneralConfigDAOMongo implements IGeneralConfigDAO {
  async findByCod (cod: string): Promise<any> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await GeneralConfigModel.findOne({ cod }).lean()
      return response
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }
}
