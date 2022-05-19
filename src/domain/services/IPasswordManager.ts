export interface IPasswordManager {
  checkPassword: (userPassword: string, requestPassword: string) => Promise<boolean>
  hashPassword: (password: string) => Promise<string>
}
