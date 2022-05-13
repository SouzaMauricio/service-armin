import { GetAllProperties } from '../../application/usecase/GetAllProperties'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'

export class GetAllPropertiesController {
  async handler (queryParams: any): Promise<any> {
    const getAllProperties = new GetAllProperties(
      new PropertyDAOMongo()
    )
    const response = await getAllProperties.execute(queryParams)
    return response
  }
}
