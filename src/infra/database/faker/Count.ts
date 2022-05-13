import { ICountDAO } from '../../../domain/dao/ICount'

export class CountDAOFaker implements ICountDAO {
  async getNextCod (): Promise<number> {
    return await new Promise((resolve, reject) => resolve(
      1
    ))
  }
}
