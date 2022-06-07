import { Schema, model, Document, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

interface IUpload extends Document {
  fullPath: string
  originalName: string
  key: string
}

const uploadSchema = new Schema<IUpload>({
  fullPath: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  }
}, { timestamps: true })

uploadSchema.plugin(paginate)

const Upload = model<IUpload, PaginateModel<IUpload>>('Upload', uploadSchema)

export default Upload
