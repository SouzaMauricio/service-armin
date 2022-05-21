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

  async verifyToken (token: string): Promise<any | boolean> {
    try {
      if (!token) return false
      const isValidToken = await jwt.verify(token, process.env.SECRET_TOKEN)
      return isValidToken
    } catch (error) {
      console.error('Error: ', error)
      return false
    }
  }
}
