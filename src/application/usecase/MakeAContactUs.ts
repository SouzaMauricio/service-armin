import { IContactUsDAO } from '../../domain/dao/IContactUs'
import { IGeneralConfigDAO } from '../../domain/dao/IGeneralConfigDAO'
import { ISendEmail } from '../../domain/infra/gateway/ISendEmail'
import { IEmailTemplate } from '../../domain/services/IEmailTemplate'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'

export class MakeAContactUs {
  private readonly contactUsDAO: IContactUsDAO
  private readonly generalConfigDAO: IGeneralConfigDAO
  private readonly sendEmailGateway: ISendEmail
  private readonly emailTemplate: IEmailTemplate
  private readonly codConfigEmailUsers: string

  constructor (contactUsDAO: IContactUsDAO, generalConfigDAO: IGeneralConfigDAO, sendEmailGateway: ISendEmail, emailTemplate: IEmailTemplate, codConfigEmailUsers: string) {
    this.contactUsDAO = contactUsDAO
    this.generalConfigDAO = generalConfigDAO
    this.sendEmailGateway = sendEmailGateway
    this.emailTemplate = emailTemplate
    this.codConfigEmailUsers = codConfigEmailUsers
  }

  async execute (body): Promise<HttpResponse> {
    try {
      const contactUs = await this.contactUsDAO.create(body)
      const config = await this.generalConfigDAO.findByCod(this.codConfigEmailUsers)
      const template = this.emailTemplate.getTemplateContactUs(config.config.emails, body) as any
      await this.sendEmailGateway.send(template)
      return ok(contactUs)
    } catch (error) {
      console.error('Error: ', error)
      return serverError()
    }
  }
}
