export interface IGeneralConfigDAO {
  findByCod: (cod: string) => Promise<any>
}
