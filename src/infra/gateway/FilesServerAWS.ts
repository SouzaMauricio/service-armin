import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'
import { IFilesServer } from '../../domain/infra/gateway/IFilesServer'
import fs from 'fs'

export class FilesServerFilesServerAWSGateway implements IFilesServer {
  constructor () {
    const credentials = new AWS.SharedIniFileCredentials()
    AWS.config.credentials = credentials
    AWS.config.update({ region: process.env.AWS_REGION })
  }

  async uploadFiles (body: any, fileName: string, serverPath: string): Promise<any> {
    const fileContent = fs.readFileSync(body.image.path)
    const s3 = new S3()
    const key = `${serverPath}${String(fileName)}`
    const s3Params = {
      Bucket: String(process.env.AWS_BUCKET_PICTURES),
      Key: key,
      Body: fileContent,
      ACL: 'public-read',
      ContentType: body.fileType
    }
    await s3.putObject(s3Params).promise()
    return {
      path: `${String(process.env.AWS_BUCKET_URL)}${serverPath}${fileName}`,
      key
    }
  }

  async deleteFile (key: string): Promise<void> {
    const s3 = new S3()
    const s3Params = {
      Bucket: String(process.env.AWS_BUCKET_PICTURES),
      Key: key
    }
    await await s3.deleteObject(s3Params).promise()
  }
}
