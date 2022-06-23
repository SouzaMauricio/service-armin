
import mongoose from 'mongoose'

export class Connection {
  async createConnection (): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI!, { maxPoolSize: 10 })
    } catch (error: any) {
      console.error('Error to load connection: ', error)

      throw new Error(error)
    }
  }

  async closeConnection (): Promise<void> {
    // await mongoose.connection.close()
  }
}
