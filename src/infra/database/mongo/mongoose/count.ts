import { Schema, model } from 'mongoose'

interface ICount {
  cod: string
  propertySequence: number
}

const countSchema = new Schema<ICount>({
  cod: {
    type: String,
    required: true,
    unique: true
  },
  propertySequence: {
    type: Number,
    required: true
  }
}, { timestamps: true })

const Count = model<ICount>('Count', countSchema)

export default Count
