export class ContactDAOFaker {
  async create (body: any): Promise<any> {
    return await new Promise((resolve, reject) => resolve({
      id: 'test'
    }))
  }
}
