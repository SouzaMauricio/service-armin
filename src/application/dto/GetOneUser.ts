interface IGetOneUser {
  id: string
  name: string
  lastName: string
  document: string
  brokerName: string[]
  email: string
  image: {
    id: string
    path: string
  }
  permissions: string[]
  password: string
}

export class GetOneUser {
  readonly id: string
  readonly name: string
  readonly lastName: string
  readonly document: string
  readonly brokerName: string[]
  readonly email: string
  readonly image: any
  readonly permissions: string[]
  readonly password: string

  constructor (body: IGetOneUser) {
    this.id = body.id
    this.name = body.name
    this.lastName = body.lastName
    this.document = body.document
    this.brokerName = body.brokerName
    this.email = body.email
    this.image = body.image
    this.permissions = body.permissions
    this.password = body.password
  }
}
