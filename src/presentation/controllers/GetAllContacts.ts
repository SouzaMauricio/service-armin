import { GetAllContacts } from '../../application/usecase/GetAllContacts'
import { ContactDAOMongo } from '../../infra/database/mongo/Contact'

export class GetAllContactsController {
  async handler (queryParams: any): Promise<any> {
    const getAllContacts = new GetAllContacts(
      new ContactDAOMongo()
    )
    const response = await getAllContacts.execute(queryParams)
    return response
  }
}
