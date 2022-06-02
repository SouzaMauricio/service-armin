import { Schema, model, Document, PaginateModel } from 'mongoose'
import { MEANS_OF_CONTACT_VALID_VALUES } from '../../../../domain/enums/means-of-contact-valid-values'
import Property from './property'
import paginate from 'mongoose-paginate-v2'

interface IContact extends Document {
  fullName: string
  email: string
  contact: string
  property: string
  meanOfContact: 'EMAIL' | 'WHATSAPP' | 'CALL'
}

const contactSchema = new Schema<IContact>({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true,
    ref: Property
  },
  meanOfContact: {
    type: String,
    enum: MEANS_OF_CONTACT_VALID_VALUES,
    required: true
  }
}, { timestamps: true })

contactSchema.plugin(paginate)

const Contact = model<IContact, PaginateModel<IContact>>('Contact', contactSchema)

export default Contact
