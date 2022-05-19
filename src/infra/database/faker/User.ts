import { IUserDAO } from '../../../domain/dao/IUser'

export class UserDAOFaker implements IUserDAO {
  async getOneByEmail (email: string): Promise<any | null> {
    if (email !== '1') {
      return await new Promise((resolve, reject) => resolve(
        null
      ))
    }
    return await new Promise((resolve, reject) => resolve({
      id: 'test'
    }))
  }
}
