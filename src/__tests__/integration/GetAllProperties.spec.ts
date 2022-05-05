import { PropertyDAOFaker } from '../../infra/database/faker/property'
import { GetAllProperties } from '../../application/usecase/GetAllProperties'

test('should return a truthy value to get all properties', async () => {
  const getAllProperties = new GetAllProperties(new PropertyDAOFaker())
  const queryStringParams = {}
  const response = await getAllProperties.execute(queryStringParams)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})
