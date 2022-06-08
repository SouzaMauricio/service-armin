import { UploadUnitImage } from '../../application/usecase/UploadUnitImage'
import { UploadDAOFaker } from '../../infra/database/faker/Upload'
import { PropertyDAOFaker } from '../../infra/database/faker/Property'
import { FilesServerGatewayFaker } from '../../infra/gateway/FilesServerGatewayFaker'

test('should return a truthy value to create a upload file', async () => {
  const uploadUnitImage = new UploadUnitImage(new UploadDAOFaker(), new PropertyDAOFaker(), new FilesServerGatewayFaker())
  const body = {
    tempId: '',
    image: ''
  }
  const response = await uploadUnitImage.execute(body)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})
