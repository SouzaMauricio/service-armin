import { SendEmailInput } from '../../application/dto/SendEmailInput'
import { IPropertyDAO } from '../../domain/dao/IProperty'
import { IEmailTemplate } from '../../domain/services/IEmailTemplate'
import { IParserContactUsTypes } from '../../domain/services/IParserContactUsTypes'

export class EmailTemplateContact implements IEmailTemplate {
  propertyDAO: IPropertyDAO | null
  parserContactUsTypes: IParserContactUsTypes | null

  constructor (propertyDAO?: IPropertyDAO, parserContactUsTypes?: IParserContactUsTypes) {
    this.propertyDAO = propertyDAO || null
    this.parserContactUsTypes = parserContactUsTypes || null
  }

  getTemplateContactUs (emailsToSend: string[], body: any): SendEmailInput {
    const subject = `Há um novo contato relacionado a '${this.parserContactUsTypes!.parseType(String(body.type))}'!`
    const bodyTemplate = 'Informações de contato:\n\n' +
      `Nome: ${String(body.fullName)}\n` +
      `Contato: ${String(body.contact)}\n` +
      `Email: ${String(body.email)}\n` +
      `Preferência de contato: ${String(body.meanOfContact)}\n` +
      `Descrição do contato: ${String(body.description)}\n\n` +
      'Boa sorte! ;)'
    return new SendEmailInput({
      to: emailsToSend,
      subject,
      body: bodyTemplate
    })
  }

  async getTemplate (emailToSend: string, body: any): Promise<SendEmailInput> {
    const property = await this.propertyDAO!.findById(body.property)
    const subject = `Sua propriedade '${String(property.title)}' tem um novo interessado!!`
    const bodyTemplate = 'Informações de contato:\n\n' +
      `Nome: ${String(body.fullName)}\n` +
      `Contato: ${String(body.contact)}\n` +
      `Email: ${String(body.email)}\n` +
      `Preferência de contato: ${String(body.meanOfContact)}\n` +
      `Interessado na propriedade: ${String(property.title)}\n\n` +
      'Boa sorte! ;)'
    return new SendEmailInput({
      to: [emailToSend],
      subject,
      body: bodyTemplate
    })
  }
}
