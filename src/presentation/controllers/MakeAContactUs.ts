import { MakeAContactUs } from '../../application/usecase/MakeAContactUs'
import { ContactUsDAOMongo } from '../../infra/database/mongo/ContactUs'
import { GeneralConfigDAOMongo } from '../../infra/database/mongo/GeneralConfig'
import { EmailTemplateContact } from '../../application/services/EmailTemplateContact'
import { SendEmailNodemailer } from '../../infra/gateway/SendEmailNodemailer'
import { ParserContactUsTypes } from '../../application/services/ParserContactUsTypes'

export class MakeAContactUsController {
  private readonly COD_CONFIG_EMAILS = 'contact-us-emails-send'

  async handler (body: any): Promise<any> {
    const makeAContactUs = new MakeAContactUs(
      new ContactUsDAOMongo(),
      new GeneralConfigDAOMongo(),
      new SendEmailNodemailer(),
      new EmailTemplateContact(undefined, new ParserContactUsTypes()),
      this.COD_CONFIG_EMAILS
    )
    const response = await makeAContactUs.execute(body)
    return response
  }
}
