import { AuthenticateUser } from '../../application/usecase/AuthenticateUser'
import { UserDAOMongo } from '../../infra/database/mongo/User'
import { TokenManagerService } from '../../application/services/TokenManager'
import { ManagerPassword } from '../../application/services/PasswordManager'

export class AuthenticateUserController {
  async handler (queryParams: any): Promise<any> {
    const authenticateUser = new AuthenticateUser(
      new UserDAOMongo(),
      new TokenManagerService(),
      new ManagerPassword()
    )
    const response = await authenticateUser.execute(queryParams)
    return response
  }
}
