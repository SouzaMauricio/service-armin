import { Schema, model, Document, PaginateModel } from 'mongoose'
import { MEANS_OF_CONTACT_VALID_VALUES } from '../../../../domain/enums/means-of-contact-valid-values'
import { CONTACT_US_TYPES_VALID_VALUES } from '../../../../domain/enums/contact-us-types-valid-values'
import paginate from 'mongoose-paginate-v2'

interface IContactUs extends Document {
  fullName: string
  email: string
  contact: string
  meanOfContact: 'EMAIL' | 'WHATSAPP' | 'CALL'
  description: string
  type: 'SELL_MY_PROPERTY' | 'RENT_MY_PROPERTY' | 'PARTNERSHIPS'| 'PRIVACY_POLICY' | 'LGPD' | 'OTHERS'
}

const contactUsSchema = new Schema<IContactUs>({
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
  meanOfContact: {
    type: String,
    enum: MEANS_OF_CONTACT_VALID_VALUES,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: CONTACT_US_TYPES_VALID_VALUES,
    required: true
  }
}, { timestamps: true })

contactUsSchema.plugin(paginate)

const ContactUs = model<IContactUs, PaginateModel<IContactUs>>('ContactUs', contactUsSchema)

export default ContactUs
