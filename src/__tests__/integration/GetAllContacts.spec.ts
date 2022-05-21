import { GetAllContacts } from '../../application/usecase/GetAllContacts'
import { ContactDAOFaker } from '../../infra/database/faker/Contact'

test('should return a truthy value to get all properties', async () => {
  const getAllContacts = new GetAllContacts(new ContactDAOFaker())
  const queryStringParams = {}
  const response = await getAllContacts.execute(queryStringParams)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})
