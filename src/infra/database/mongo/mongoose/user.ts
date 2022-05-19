import { Schema, model } from 'mongoose'

interface IUser {
  name: string
  lastName: string
  document: string
  brokerName: string[]
  email: string
  password: string
  image: {
    _id: string
    path: string
  }
  permissions: string[]
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
  brokerName: {
    type: [String],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    _id: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  permissions: {
    type: [String],
    required: true
  }
}, { timestamps: true })

const User = model<IUser>('User', userSchema)

export default User
