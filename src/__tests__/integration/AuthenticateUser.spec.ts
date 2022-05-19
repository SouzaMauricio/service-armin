import { AuthenticateUser } from '../../application/usecase/AuthenticateUser'
import { UserDAOFaker } from '../../infra/database/faker/User'
import { TokenManagerServiceFaker } from '../../application/services/faker/TokenManagerService'
import { PasswordManagerServiceFaker } from '../../application/services/faker/PasswordManagerService'
import { NotFoundError } from '../../presentation/error/not-found-error'

test('should return success when user is valid', async () => {
  const body = {
    email: '1',
    password: '1'
  }
  const authenticateUser = new AuthenticateUser(new UserDAOFaker(), new TokenManagerServiceFaker(), new PasswordManagerServiceFaker())
  const response = await authenticateUser.execute(body)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})

test('should return a notfound error when user is invalid', async () => {
  const body = {
    email: '2',
    password: '2'
  }
  const authenticateUser = new AuthenticateUser(new UserDAOFaker(), new TokenManagerServiceFaker(), new PasswordManagerServiceFaker())
  const response = await authenticateUser.execute(body)
  expect(response.statusCode).toEqual(404)
  expect(response.body).toEqual(new NotFoundError('User'))
})

test('should not verify password when user is invalid', async () => {
  const body = {
    email: '3',
    password: '3'
  }
  const passwordManager = new PasswordManagerServiceFaker()
  const checkPasswordSpy = jest.spyOn(passwordManager, 'checkPassword')
  const authenticateUser = new AuthenticateUser(new UserDAOFaker(), new TokenManagerServiceFaker(), passwordManager)
  await authenticateUser.execute(body)
  expect(checkPasswordSpy).not.toBeCalled()
})

test('should not call createAccessToken when user is invalid', async () => {
  const body = {
    email: '2',
    password: '2'
  }
  const generateTokenServiceFaker = new TokenManagerServiceFaker()
  const createAccessTokenSpy = jest.spyOn(generateTokenServiceFaker, 'createAccessToken')
  const authenticateUser = new AuthenticateUser(new UserDAOFaker(), generateTokenServiceFaker, new PasswordManagerServiceFaker())
  await authenticateUser.execute(body)
  expect(createAccessTokenSpy).not.toBeCalled()
})
