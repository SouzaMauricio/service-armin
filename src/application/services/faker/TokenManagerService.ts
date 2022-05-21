import { ITokenManagerService } from '../../../domain/services/ITokenManagerService'

interface IPayloadUser {
  id: string
  email: string
}

export class TokenManagerServiceFaker implements ITokenManagerService {
  createAccessToken (body: IPayloadUser): string {
    return 'new_token'
  }

  async verifyToken (token: string): Promise<any | boolean> {
    return await new Promise((resolve, reject) => resolve(
      true
    ))
  }
}
