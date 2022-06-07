export interface IUploadDAO {
  create: (body: any) => Promise<any>
  findById: (uploadId: string) => Promise<any>
  deleteOne: (uploadId: string) => Promise<any>
}
