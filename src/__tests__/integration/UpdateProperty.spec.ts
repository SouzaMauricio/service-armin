import { PropertyDAOFaker } from '../../infra/database/faker/Property'
import { UpdateProperty } from '../../application/usecase/UpdateProperty'
import { InvalidParamError, NotFoundError } from '../../presentation/error'

test('should update a property by cod', async () => {
  const cod = 'COD1'
  const body = {
    title: 'New Title'
  }
  const updateProperty = new UpdateProperty(new PropertyDAOFaker())
  const response = await updateProperty.execute(cod, body)
  expect(response.statusCode).toEqual(200)
})

test('should get property type to validate fields', async () => {
  const cod = 'COD1'
  const body = {
    title: []
  }
  const propertyDAO = new PropertyDAOFaker()
  const getPropertyTypeByCodSpy = jest.spyOn(propertyDAO, 'getPropertyTypeByCod')
  const updateProperty = new UpdateProperty(propertyDAO)
  await updateProperty.execute(cod, body)
  expect(getPropertyTypeByCodSpy).toHaveBeenCalled()
})

test('should return notFound error with property not found', async () => {
  const cod = 'COD0'
  const body = {
    views: []
  }
  const updateProperty = new UpdateProperty(new PropertyDAOFaker())
  const response = await updateProperty.execute(cod, body)
  expect(response.statusCode).toEqual(404)
  expect(response.body).toEqual(new NotFoundError('Property'))
})

test('should return bad request error with body contains invalid fields to update for APARTMENT type', async () => {
  const cod = 'COD1'
  const body = {
    landArea: 10
  }
  const updateProperty = new UpdateProperty(new PropertyDAOFaker())
  const response = await updateProperty.execute(cod, body)
  expect(response.statusCode).toEqual(400)
  expect(response.body).toEqual(new InvalidParamError('landArea'))
})

test('should return bad request error with body contains invalid fields to update for PRIVATE_HOUSE type', async () => {
  const cod = 'COD2'
  const body = {
    condominium: {}
  }
  const updateProperty = new UpdateProperty(new PropertyDAOFaker())
  const response = await updateProperty.execute(cod, body)
  expect(response.statusCode).toEqual(400)
  expect(response.body).toEqual(new InvalidParamError('condominium'))
})

test('should return bad request error with body contains invalid fields to update for HOUSE_IN_CONDOMINIUM type', async () => {
  const cod = 'COD3'
  const body = {
    floor: 10
  }
  const updateProperty = new UpdateProperty(new PropertyDAOFaker())
  const response = await updateProperty.execute(cod, body)
  expect(response.statusCode).toEqual(400)
  expect(response.body).toEqual(new InvalidParamError('floor'))
})

test('should return bad request error with body contains invalid fields to update for RELEASE type', async () => {
  const cod = 'COD4'
  const body = {
    toRent: true
  }
  const updateProperty = new UpdateProperty(new PropertyDAOFaker())
  const response = await updateProperty.execute(cod, body)
  expect(response.statusCode).toEqual(400)
  expect(response.body).toEqual(new InvalidParamError('toRent'))
})

test('should call propertyDAO.update to save', async () => {
  const cod = 'COD1'
  const body = {
    title: 'New Title'
  }
  const propertyDAOFaker = new PropertyDAOFaker()
  const updateOneByCodSpy = jest.spyOn(propertyDAOFaker, 'updateOneByCod')
  const updateProperty = new UpdateProperty(propertyDAOFaker)
  await updateProperty.execute(cod, body)
  expect(updateOneByCodSpy).toBeCalled()
})
