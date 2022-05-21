import { GetAllContactUs } from '../../application/usecase/GetAllContactUs'
import { ContactUsDAOFaker } from '../../infra/database/faker/ContactUs'

test('should return a truthy value to get all properties', async () => {
  const getAllContactUs = new GetAllContactUs(new ContactUsDAOFaker())
  const queryStringParams = {}
  const response = await getAllContactUs.execute(queryStringParams)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})
