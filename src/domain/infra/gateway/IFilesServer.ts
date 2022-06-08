export interface IFilesServer {
  uploadFiles: (file: any, newName: string, path: string) => Promise<any>
  deleteFile: (key: string) => Promise<void>
}
