export interface IPropertyDAO {
  create: (body: any) => Promise<any>
  findByCod: (propertyCod: string) => Promise<any>
  findById: (propertyCod: string) => Promise<any>
  getPropertyTypeByCod: (propertyCod: string) => Promise<string | null>
  updateOneByCod: (propertyCod: string, body: any) => Promise<any | null>
  find: (query: any, queryStringParams) => Promise<any | []>
  pushNewPicture: (propertyId: string, body: any) => Promise<void>
  removePicture: (propertyId: string, uploadId: string) => Promise<void>
}
