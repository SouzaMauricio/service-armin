import { SendEmailInput } from '../../application/dto/SendEmailInput'
import { IPropertyDAO } from '../../domain/dao/IProperty'
import { EmailTemplate } from '../../domain/services/EmailTemplate'

export class EmailTemplateContact implements EmailTemplate {
  propertyDAO: IPropertyDAO

  constructor (propertyDAO: IPropertyDAO) {
    this.propertyDAO = propertyDAO
  }

  async getTemplate (emailToSend: string, body: any): Promise<SendEmailInput> {
    const property = await this.propertyDAO.findById(body.propertyId)
    const subject = `Sua propriedade ${String(property.title)} tem um novo interessado!!`
    const bodyTemplate = 'Informações de contato:' +
      `Nome: ${String(body.fullName)}\n` +
      `Contato: ${String(body.contact)}\n` +
      `Email: ${String(body.email)}\n` +
      `Preferência de contato: ${String(body.meansOfContact.join(', '))}\n` +
      `Interessado na propriedade: ${String(property.title)}\n\n` +
      'Boa sorte! ;)'
    return new SendEmailInput({
      to: [emailToSend],
      subject,
      body: bodyTemplate
    })
  }
}
