export interface IContactDAO {
  create: (body: any) => Promise<any>
  find: (query: any, queryStringParams) => Promise<any | []>
}
