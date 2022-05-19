export interface ICountDAO {
  getNextCod: () => Promise<number>
}
