import { SendEmailInput } from '../../application/dto/SendEmailInput'

export interface IEmailTemplate {
  getTemplate: (emailToSend: string, body: any) => Promise<SendEmailInput>
  getTemplateContactUs: (emailsToSend: string[], body: any) => SendEmailInput
}
