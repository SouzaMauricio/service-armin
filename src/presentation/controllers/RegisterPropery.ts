import { RegisterProperty } from '../../application/usecase/RegisterProperty'
import { HttpRequest } from '../protocols'
import { PropertyDAOMongo } from '../../infra/database/mongo/property'

export class RegisterPropertyController {
  async handler (request: HttpRequest): Promise<any> {
    const registerProperty = new RegisterProperty(
      new PropertyDAOMongo()
    )
    const response = await registerProperty.execute(request.body)
    return response
  }
}
