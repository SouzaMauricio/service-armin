interface IPayloadUser {
  id: string
  email: string
}

export interface ITokenManagerService {
  createAccessToken: (body: IPayloadUser) => string
  verifyToken: (token: string) => any
}
