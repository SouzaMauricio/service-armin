import { RegisterProperty } from '../../application/usecase/RegisterProperty'
import { MissingParamError } from '../../presentation/error'
import { PropertyDAOFaker } from '../../infra/database/faker/Property'
import {
  APARTMENT,
  PRIVATE_HOUSE,
  HOUSE_IN_CONDOMINIUM,
  RELEASE
} from '../../domain/enums/property-valid-types'
import { CountDAOFaker } from '../../infra/database/faker/Count'

const makeAProperty = (): any => {
  return {
    title: 'new property title',
    description: 'new property description',
    floor: 1,
    toRent: true,
    toSell: true,
    propertyArea: 40,
    landArea: 40,
    type: APARTMENT,
    pictures: [
      {
        uploadId: 'uploadId',
        image: 'http:image'
      }
    ],
    localization: {
      street: 'new property street',
      number: '123',
      complement: null,
      neighborhood: 'new property neighborhood',
      city: 'new property city',
      state: 'new property state',
      zipcode: 'new property zipcode'
    },
    environments: {
      bedroom: [1],
      bathrooms: [1],
      suites: [1],
      kitchen: [1],
      garages: [1],
      livingroom: [1],
      balcony: [1]
    },
    keywords: [
      'new property',
      'new'
    ],
    condominium: {
      condominiumValue: 500,
      condominiumFacilities: [
        {
          facility: 'Parquinho',
          icon: 'park'
        }
      ]
    },
    price: {
      sale: 100000,
      rent: 1500
    },
    user: '1234',
    brokerName: 'Tets broker',
    show: true
  }
}

test('should register a new apartment type property ', async () => {
  const propertyDAO = new PropertyDAOFaker()
  const property = makeAProperty()
  const registerProperty = new RegisterProperty(propertyDAO, new CountDAOFaker())
  const response = await registerProperty.execute(property)
  expect(response.statusCode).toBe(200)
  expect(response.body).toBeTruthy()
})

test('should thow an erro if a APARTMENT type property provider without required field', async () => {
  const propertyDAO = new PropertyDAOFaker()
  const property = makeAProperty()
  delete property.propertyArea
  const registerProperty = new RegisterProperty(propertyDAO, new CountDAOFaker())
  const response = await registerProperty.execute(property)
  expect(response.statusCode).toBe(400)
  expect(response.body).toEqual(new MissingParamError('propertyArea'))
})

test('should thow an erro if a PRIVATE_HOUSE type property provider without required field', async () => {
  const propertyDAO = new PropertyDAOFaker()
  const property = makeAProperty()
  property.type = PRIVATE_HOUSE
  delete property.landArea
  const registerProperty = new RegisterProperty(propertyDAO, new CountDAOFaker())
  const response = await registerProperty.execute(property)
  expect(response.statusCode).toBe(400)
  expect(response.body).toEqual(new MissingParamError('landArea'))
})

test('should thow an erro if a HOUSE_IN_CONDOMINIUM type property provider without required field', async () => {
  const propertyDAO = new PropertyDAOFaker()
  const property = makeAProperty()
  property.type = HOUSE_IN_CONDOMINIUM
  delete property.condominium
  const registerProperty = new RegisterProperty(propertyDAO, new CountDAOFaker())
  const response = await registerProperty.execute(property)
  expect(response.statusCode).toBe(400)
  expect(response.body).toEqual(new MissingParamError('condominium'))
})

test('should thow an erro if a RELEASE type property provider without required field', async () => {
  const propertyDAO = new PropertyDAOFaker()
  const property = makeAProperty()
  property.type = RELEASE
  delete property.release
  const registerProperty = new RegisterProperty(propertyDAO, new CountDAOFaker())
  const response = await registerProperty.execute(property)
  expect(response.statusCode).toBe(400)
  expect(response.body).toEqual(new MissingParamError('release'))
})

test('should call a DAO to register a new property', async () => {
  const propertyDAO = new PropertyDAOFaker()
  const propertyFakerSpy = jest.spyOn(propertyDAO, 'create')
  const property = makeAProperty()
  const registerProperty = new RegisterProperty(propertyDAO, new CountDAOFaker())
  await registerProperty.execute(property)
  expect(propertyFakerSpy).toBeCalled()
})

test('should add cod in body', async () => {
  const propertyDAO = new PropertyDAOFaker()
  const property = makeAProperty()
  const registerProperty = new RegisterProperty(propertyDAO, new CountDAOFaker())
  await registerProperty.execute(property)
  expect(property).toHaveProperty('cod')
})

test('should call countDAO to add cod', async () => {
  const countDAOFaker = new CountDAOFaker()
  const countDAOFakerSpy = jest.spyOn(countDAOFaker, 'getNextCod')
  const property = makeAProperty()
  const registerProperty = new RegisterProperty(new PropertyDAOFaker(), countDAOFaker)
  await registerProperty.execute(property)
  expect(countDAOFakerSpy).toBeCalled()
})
