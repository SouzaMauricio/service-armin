import { Schema, model, Document, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

interface IGeneralConfig extends Document {
  cod: string
  description: string
  config: any
}

const generalConfigSchema = new Schema<IGeneralConfig>({
  cod: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  config: {
    type: Object,
    required: true
  }
}, { timestamps: true })

generalConfigSchema.plugin(paginate)

const GeneralConfig = model<IGeneralConfig, PaginateModel<IGeneralConfig>>('GeneralConfig', generalConfigSchema)

export default GeneralConfig
