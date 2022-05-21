import { MakeAContact } from '../../application/usecase/MakeAContact'
import { ContactDAOMongo } from '../../infra/database/mongo/Contact'
import { PropertyDAOMongo } from '../../infra/database/mongo/Property'
import { PropertyRepositoryMongo } from '../../infra/repositories/mongo/Property'
import { EmailTemplateContact } from '../../application/services/EmailTemplateContact'
import { SendEmailGatewayFaker } from '../../infra/gateway/SendEmailGatewayFaker'

export class MakeAContactController {
  async handler (body: any): Promise<any> {
    const makeAContact = new MakeAContact(
      new ContactDAOMongo(),
      new PropertyRepositoryMongo(),
      new SendEmailGatewayFaker(),
      new EmailTemplateContact(new PropertyDAOMongo())
    )
    const response = await makeAContact.execute(body)
    return response
  }
}
