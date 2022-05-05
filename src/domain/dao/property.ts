export interface PropertyDAO {
  create: (body: any) => Promise<any>
  findByCod: (propertyCod: string) => Promise<any>
  getPropertyTypeByCod: (propertyCod: string) => Promise<string | null>
  updateOneByCod: (propertyCod: string, body: any) => Promise<any | null>
  find: (query: any, page: number) => Promise<any | []>
}
