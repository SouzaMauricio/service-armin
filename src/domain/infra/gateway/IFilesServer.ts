export interface IFilesServer {
  uploadPropertyPictureFile: (file: any, newName: string) => Promise<string>
}
