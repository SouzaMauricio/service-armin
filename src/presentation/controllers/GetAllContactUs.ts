import { GetAllContactUs } from '../../application/usecase/GetAllContactUs'
import { ContactUsDAOMongo } from '../../infra/database/mongo/ContactUs'

export class GetAllContactUsController {
  async handler (queryParams: any): Promise<any> {
    const getAllContactUs = new GetAllContactUs(
      new ContactUsDAOMongo()
    )
    const response = await getAllContactUs.execute(queryParams)
    return response
  }
}
