import { UpdateProperty } from '../../application/usecase/UpdateProperty'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'

export class UpdatePropertyController {
  async handler (propertyCod: string, body: any): Promise<any> {
    const updateProperty = new UpdateProperty(
      new PropertyDAOMongo()
    )
    const response = await updateProperty.execute(propertyCod, body)
    return response
  }
}
