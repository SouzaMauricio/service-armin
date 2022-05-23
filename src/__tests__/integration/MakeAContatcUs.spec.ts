import { MakeAContactUs } from '../../application/usecase/MakeAContactUs'
import { ContactUsDAOFaker } from '../../infra/database/faker/ContactUs'
import { SendEmailGatewayFaker } from '../../infra/gateway/SendEmailGatewayFaker'
import { EmailTemplateContact } from '../../application/services/EmailTemplateContact'
import { GeneralConfigDAOFaker } from '../../infra/database/faker/GeneralConfig'
import { ParserContactUsTypes } from '../../application/services/ParserContactUsTypes'

const body = {
  fullName: 'test name',
  email: 'email@faker.com',
  contact: '00000000000',
  meansOfContact: 'EMAIL'
}

const CONFIG_FAKER_COD = 'test'

test('should create a new contactUs', async () => {
  const makeAContact = new MakeAContactUs(new ContactUsDAOFaker(), new GeneralConfigDAOFaker(), new SendEmailGatewayFaker(), new EmailTemplateContact(undefined, new ParserContactUsTypes()), CONFIG_FAKER_COD)
  const response = await makeAContact.execute(body)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})

test('should call ContactUsDAOFaker to save contact form', async () => {
  const contactUsDAOFaker = new ContactUsDAOFaker()
  const createSpy = jest.spyOn(contactUsDAOFaker, 'create')
  const makeAContactUs = new MakeAContactUs(contactUsDAOFaker, new GeneralConfigDAOFaker(), new SendEmailGatewayFaker(), new EmailTemplateContact(undefined, new ParserContactUsTypes()), CONFIG_FAKER_COD)
  await makeAContactUs.execute(body)
  expect(createSpy).toBeCalled()
})

test('should get email from generalConfig', async () => {
  const emailTemplate = new EmailTemplateContact(undefined, new ParserContactUsTypes())
  const expectBody = await emailTemplate.getTemplateContactUs(['email_user@email.com'], body)
  const sendEmailGateway = new SendEmailGatewayFaker()
  const sendEmailSpy = jest.spyOn(sendEmailGateway, 'send')
  const makeAContactUs = new MakeAContactUs(new ContactUsDAOFaker(), new GeneralConfigDAOFaker(), sendEmailGateway, emailTemplate, CONFIG_FAKER_COD)
  await makeAContactUs.execute(body)
  expect(sendEmailSpy).toBeCalledWith(expectBody)
})

test('should send email to user from generalConfig', async () => {
  const sendEmailGateway = new SendEmailGatewayFaker()
  const sendEmailSpy = jest.spyOn(sendEmailGateway, 'send')
  const makeAContactUs = new MakeAContactUs(new ContactUsDAOFaker(), new GeneralConfigDAOFaker(), sendEmailGateway, new EmailTemplateContact(undefined, new ParserContactUsTypes()), CONFIG_FAKER_COD)
  await makeAContactUs.execute(body)
  expect(sendEmailSpy).toBeCalled()
})
