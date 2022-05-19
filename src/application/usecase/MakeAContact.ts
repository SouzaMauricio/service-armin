import { IContactDAO } from '../../domain/dao/IContact'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols'
import { ISendEmail } from '../../domain/infra/gateway/ISendEmail'
import { IPropertyRepository } from '../../domain/infra/repositories/IProperty'
import { IEmailTemplate } from '../../domain/services/IEmailTemplate'

export class MakeAContact {
  contactDAO: IContactDAO
  sendEmailGateway: ISendEmail
  propertyRepository: IPropertyRepository
  emailTemplate: IEmailTemplate

  constructor (contactDAO: IContactDAO, propertyRepository: IPropertyRepository, sendEmailGateway: ISendEmail, emailTemplate: IEmailTemplate) {
    this.contactDAO = contactDAO
    this.sendEmailGateway = sendEmailGateway
    this.propertyRepository = propertyRepository
    this.emailTemplate = emailTemplate
  }

  async execute (body: any): Promise<HttpResponse> {
    try {
      const contact = this.contactDAO.create(body)
      const emailUser = await this.propertyRepository.getUserEmailByPropertyId(body.propertyId)
      const templateEmail = await this.emailTemplate.getTemplate(emailUser, body)
      await this.sendEmailGateway.send(templateEmail)
      return ok(contact)
    } catch (error) {
      console.error('Error:', error)
      return serverError()
    }
  }
}
