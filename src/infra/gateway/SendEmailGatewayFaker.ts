import { SendEmailInput } from '../../application/dto/SendEmailInput'
import { ISendEmail } from '../../domain/infra/gateway/ISendEmail'

export class SendEmailGatewayFaker implements ISendEmail {
  async send (body: SendEmailInput): Promise<void> {
  }
}
