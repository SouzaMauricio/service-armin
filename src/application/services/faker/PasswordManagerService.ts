import { IPasswordManager } from '../../../domain/services/IPasswordManager'

export class PasswordManagerServiceFaker implements IPasswordManager {
  async checkPassword (userPassword: string, requestPassword: string): Promise<boolean> {
    return await new Promise((resolve, reject) => resolve(
      !(requestPassword === '3')
    ))
  }

  async hashPassword (userPassword: string): Promise<string> {
    return await new Promise((resolve, reject) => resolve(
      'new_password'
    ))
  }
}
