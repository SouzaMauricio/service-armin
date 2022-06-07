export interface IFilesServer {
  uploadPropertyPictureFile: (file: any, newName: string) => Promise<any>
  deleteFile: (key: string) => Promise<void>
}
