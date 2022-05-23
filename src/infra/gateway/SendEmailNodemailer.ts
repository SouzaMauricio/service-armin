import { SendEmailInput } from '../../application/dto/SendEmailInput'
import { ISendEmail } from '../../domain/infra/gateway/ISendEmail'
import nodemailer from 'nodemailer'

export class SendEmailNodemailer implements ISendEmail {
  private readonly transporter: nodemailer.Transporter

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: parseInt(process.env.EMAIL_SERVER_PORT!),
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  async send (body: SendEmailInput): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL,
      to: body.to,
      subject: body.subject,
      text: body.body
    })
  }
}
