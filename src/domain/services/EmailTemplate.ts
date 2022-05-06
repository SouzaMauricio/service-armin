import { SendEmailInput } from '../../application/dto/SendEmailInput'

export interface EmailTemplate {
  getTemplate: (emailToSend: string, body: any) => Promise<SendEmailInput>
}
