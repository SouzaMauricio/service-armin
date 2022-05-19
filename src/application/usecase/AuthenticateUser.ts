import { IUserDAO } from '../../domain/dao/IUser'
import { ITokenManagerService } from '../../domain/services/ITokenManagerService'
import { IPasswordManager } from '../../domain/services/IPasswordManager'
import { notFound, ok } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'
import { GetOneUser } from '../dto/GetOneUser'

export class AuthenticateUser {
  userDAO: IUserDAO
  tokenManagerService: ITokenManagerService
  passwordManager: IPasswordManager

  constructor (userDAO: IUserDAO, tokenManagerService: ITokenManagerService, passwordManager: IPasswordManager) {
    this.userDAO = userDAO
    this.tokenManagerService = tokenManagerService
    this.passwordManager = passwordManager
  }

  async execute (body: any): Promise<HttpResponse> {
    const user = await this.userDAO.getOneByEmail(body.email) as GetOneUser
    if (!user) return notFound('User')
    const isValidPassword = await this.passwordManager.checkPassword(user.password, body.password)
    if (!isValidPassword) return notFound('User')
    const token = this.tokenManagerService.createAccessToken({
      id: user.id,
      email: user.email
    })
    return ok(token)
  }
}
