import { HttpResponse } from '../../presentation/protocols'

export interface PropertyDAO {
  create: (body: any) => Promise<HttpResponse>
  findByCod: (propertyCod: string) => Promise<HttpResponse>
}
