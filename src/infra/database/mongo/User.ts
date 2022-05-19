import { IUserDAO } from '../../../domain/dao/IUser'
import { Connection } from './mongoose/connections/Connection'
import UserModel from './mongoose/user'
import { GetOneUser } from '../../../application/dto/GetOneUser'

export class UserDAOMongo implements IUserDAO {
  async getOneByEmail (email: string): Promise<GetOneUser | null> {
    const connection = new Connection()
    try {
      await connection.createConnection()
      const response = await UserModel.findOne<any>(
        {
          email
        }
      ).lean()
      if (!response) return null
      return new GetOneUser({
        id: response._id,
        name: response.name,
        lastName: response.lastName,
        document: response.document,
        brokerName: response.brokerName,
        email: response.email,
        image: response.image,
        permissions: response.permissions,
        password: response.password
      })
    } catch (error) {
      console.error('Error: ', error)
      throw error
    } finally {
      await connection.closeConnection()
    }
  }
}
