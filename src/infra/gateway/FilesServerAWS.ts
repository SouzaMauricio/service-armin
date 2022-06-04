import AWS from 'aws-sdk'
import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'
import fs from 'fs'

export class FilesServerFilesServerAWSGateway implements IFilesServer {
  constructor () {
    const credentials = new AWS.SharedIniFileCredentials()
    AWS.config.credentials = credentials
    AWS.config.update({ region: process.env.AWS_REGION })
  }

  async uploadPropertyPictureFile (body: any, fileName: string): Promise<string> {
    const fileContent = fs.readFileSync(body.image.path)
    const s3 = new AWS.S3()
    const path = 'properties/'
    const s3Params = {
      Bucket: String(process.env.AWS_BUCKET_PICTURES),
      Key: `${path}${String(fileName)}`,
      Body: fileContent,
      ACL: 'public-read',
      ContentType: body.fileType
    }
    await s3.putObject(s3Params).promise()
    return `${String(process.env.AWS_BUCKET_URL)}${path}${fileName}`
  }
}
