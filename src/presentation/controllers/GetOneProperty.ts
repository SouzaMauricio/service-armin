import { GetOneProperty } from '../../application/usecase/GetOneProperty'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'

export class GetOnePropertyController {
  async handler (cod: string): Promise<any> {
    const getOneProperty = new GetOneProperty(
      new PropertyDAOMongo()
    )
    const response = await getOneProperty.execute(cod)
    return response
  }
}
