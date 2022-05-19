import { ITokenManagerService } from '../../domain/services/ITokenManagerService'
import jwt from 'jsonwebtoken'

interface IPayloadUser {
  id: string
  email: string
}

export class TokenManagerService implements ITokenManagerService {
  createAccessToken (body: IPayloadUser): string {
    const token = jwt.sign({ body }, process.env.SECRET_TOKEN, {
      expiresIn: 14400 // expires in 4 hours
    })
    return token
  }
}
