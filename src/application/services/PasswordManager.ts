import { IPasswordManager } from '../../domain/services/IPasswordManager'
import bcrypt from 'bcrypt'

export class ManagerPassword implements IPasswordManager {
  private readonly SALT_ROUNDS_HASH = 10

  async checkPassword (userPassword: string, requestPassword: any): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(requestPassword, userPassword)
    return isValidPassword
  }

  async hashPassword (password): Promise<string> {
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS_HASH)
    return passwordHash
  }
}
