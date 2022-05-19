export interface IUserDAO {
  getOneByEmail: (user: string) => Promise<any | null>
}
