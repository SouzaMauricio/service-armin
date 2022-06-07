import { RemoveUploadPicture } from '../../application/usecase/RemoveUploadPicture'
import { UploadDAOFaker } from '../../infra/database/faker/Upload'
import { PropertyDAOFaker } from '../../infra/database/faker/Property'
import { FilesServerGatewayFaker } from '../../infra/gateway/FilesServerGatewayFaker'

test('should remove a upload file', async () => {
  const uploadPictures = new RemoveUploadPicture(new UploadDAOFaker(), new PropertyDAOFaker(), new FilesServerGatewayFaker())
  const response = await uploadPictures.execute('test', 'test')
  expect(response.statusCode).toEqual(200)
  expect(response.body).toBeTruthy()
})
