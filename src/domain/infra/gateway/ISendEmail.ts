import { SendEmailInput } from '../../../application/dto/SendEmailInput'

export interface ISendEmail {
  send: (body: SendEmailInput) => void
}
