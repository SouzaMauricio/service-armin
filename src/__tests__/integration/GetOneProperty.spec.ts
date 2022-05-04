import { GetOneProperty } from '../../application/usecase/GetOneProperty'
import { PropertyDAOFaker } from '../../infra/database/faker/property'
import { NotFoundError } from '../../presentation/error/not-found-error'

test('shoul return one property', async () => {
  const propertyCod = 'COD1'
  const getOneProperty = new GetOneProperty(new PropertyDAOFaker())
  const response = await getOneProperty.execute(propertyCod)
  expect(response.statusCode).toBe(200)
  expect(response.body.cod).toEqual(propertyCod)
})

test('shoul return a not found error when return null', async () => {
  const propertyCod = 'COD2'
  const getOneProperty = new GetOneProperty(new PropertyDAOFaker())
  const response = await getOneProperty.execute(propertyCod)
  expect(response.statusCode).toBe(404)
  expect(response.body).toEqual(new NotFoundError('Property'))
})

test('should call propertyDAO.findByCod', async () => {
  const propertyDAOFaker = new PropertyDAOFaker()
  const findByCodSpy = jest.spyOn(propertyDAOFaker, 'findByCod')
  const propertyCod = 'COD1'
  const getOneProperty = new GetOneProperty(propertyDAOFaker)
  await getOneProperty.execute(propertyCod)
  expect(findByCodSpy).toBeCalled()
})
