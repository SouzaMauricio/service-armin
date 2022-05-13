import { RegisterProperty } from '../../application/usecase/RegisterProperty'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'
import { CountDAOMongo } from '../../infra/database/mongo/Count'

export class RegisterPropertyController {
  async handler (body: any): Promise<any> {
    const registerProperty = new RegisterProperty(
      new PropertyDAOMongo(),
      new CountDAOMongo()
    )
    const response = await registerProperty.execute(body)
    return response
  }
}
