import { UploadPictures } from '../../application/usecase/UploadPictures'
import { UploadDAOFaker } from '../../infra/database/faker/Upload'
import { PropertyDAOFaker } from '../../infra/database/faker/Property'
import { FilesServerGatewayFaker } from '../../infra/gateway/FilesServerGatewayFaker'

test('should return a truthy value to create a upload file', async () => {
  const uploadPictures = new UploadPictures(new UploadDAOFaker(), new PropertyDAOFaker(), new FilesServerGatewayFaker())
  const body = {
    files: []
  }
  const response = await uploadPictures.execute(body)
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})
