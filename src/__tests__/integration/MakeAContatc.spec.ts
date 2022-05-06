import { MakeAContact } from '../../application/usecase/MakeAContact'
import { ContactDAOFaker } from '../../infra/database/faker/contact'
import { SendEmailGatewayFaker } from '../../infra/gateway/SendEmailGatewayFaker'
import { PropertyRepositoryFaker } from '../../infra/repositories/PropertyFaker'
import { EmailTemplateContact } from '../../application/services/EmailTemplateContact'
import { PropertyDAOFaker } from '../../infra/database/faker/property'

const body = {
  fullName: 'test name',
  email: 'email@faker.com',
  contact: '00000000000',
  propertyId: '1',
  meansOfContact: ['EMAIL', 'WHATSAPP']
}

test('should create a new contact', async () => {
  const makeAContact = new MakeAContact(new ContactDAOFaker(), new PropertyRepositoryFaker(), new SendEmailGatewayFaker(), new EmailTemplateContact(new PropertyDAOFaker()))
  const response = await makeAContact.execute(body)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})

test('should call contactDAO to save contact form', async () => {
  const contactDAOFaker = new ContactDAOFaker()
  const createSpy = jest.spyOn(contactDAOFaker, 'create')
  const makeAContact = new MakeAContact(contactDAOFaker, new PropertyRepositoryFaker(), new SendEmailGatewayFaker(), new EmailTemplateContact(new PropertyDAOFaker()))
  await makeAContact.execute(body)
  expect(createSpy).toBeCalled()
})

test('should get email from property user', async () => {
  const emailTemplate = new EmailTemplateContact(new PropertyDAOFaker())
  const expectBody = await emailTemplate.getTemplate('email_user@email.com', body)
  const sendEmailGateway = new SendEmailGatewayFaker()
  const sendEmailSpy = jest.spyOn(sendEmailGateway, 'send')
  const makeAContact = new MakeAContact(new ContactDAOFaker(), new PropertyRepositoryFaker(), sendEmailGateway, new EmailTemplateContact(new PropertyDAOFaker()))
  await makeAContact.execute(body)
  expect(sendEmailSpy).toBeCalledWith(expectBody)
})

test('should send email to user from property', async () => {
  const sendEmailGateway = new SendEmailGatewayFaker()
  const sendEmailSpy = jest.spyOn(sendEmailGateway, 'send')
  const makeAContact = new MakeAContact(new ContactDAOFaker(), new PropertyRepositoryFaker(), sendEmailGateway, new EmailTemplateContact(new PropertyDAOFaker()))
  await makeAContact.execute(body)
  expect(sendEmailSpy).toBeCalled()
})
