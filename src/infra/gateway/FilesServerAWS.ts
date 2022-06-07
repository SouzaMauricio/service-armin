import AWS from 'aws-sdk'
import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'
import fs from 'fs'

export class FilesServerFilesServerAWSGateway implements IFilesServer {
  constructor () {
    const credentials = new AWS.SharedIniFileCredentials()
    AWS.config.credentials = credentials
    AWS.config.update({ region: process.env.AWS_REGION })
  }

  async uploadPropertyPictureFile (body: any, fileName: string): Promise<any> {
    const fileContent = fs.readFileSync(body.image.path)
    const s3 = new AWS.S3()
    const path = 'properties/'
    const key = `${path}${String(fileName)}`
    const s3Params = {
      Bucket: String(process.env.AWS_BUCKET_PICTURES),
      Key: key,
      Body: fileContent,
      ACL: 'public-read',
      ContentType: body.fileType
    }
    await s3.putObject(s3Params).promise()
    return {
      path: `${String(process.env.AWS_BUCKET_URL)}${path}${fileName}`,
      key
    }
  }

  async deleteFile (key: string): Promise<void> {
    const s3 = new AWS.S3()
    const s3Params = {
      Bucket: String(process.env.AWS_BUCKET_PICTURES),
      Key: key
    }
    await await s3.deleteObject(s3Params).promise()
  }
}
