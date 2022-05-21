import { IGeneralConfigDAO } from '../../../domain/dao/IGeneralConfigDAO'

export class GeneralConfigDAOFaker implements IGeneralConfigDAO {
  async findByCod (cod: string): Promise<any> {
    return await new Promise((resolve, reject) => resolve(
      {
        config: {
          emails: ['email_user@email.com']
        }
      }
    ))
  }
}
