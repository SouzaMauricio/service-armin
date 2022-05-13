import { RegisterProperty } from '../../application/usecase/RegisterProperty'
import { HttpRequest } from '../protocols'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'
import { CountDAOMongo } from '../../infra/database/mongo/Count'

export class RegisterPropertyController {
  async handler (request: HttpRequest): Promise<any> {
    const registerProperty = new RegisterProperty(
      new PropertyDAOMongo(),
      new CountDAOMongo()
    )
    const response = await registerProperty.execute(request.body)
    return response
  }
}
