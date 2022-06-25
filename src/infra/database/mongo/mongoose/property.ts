import { Document, model, PaginateModel, Schema, Types } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { PROPERTY_RELEASE_STATE_VALID_TYPES } from '../../../../domain/enums/property-release-state-valid-values'
import {
  APARTMENT, HOUSE_IN_CONDOMINIUM, PRIVATE_HOUSE, PROPERTY_VALID_TYPES, RELEASE
} from '../../../../domain/enums/property-valid-types'
import UserModel from './user'

interface INearby {
  title: string
  icon: string
  distance: number
}
interface IRelease {
  state: 'NOT_STARTED' | 'STARTED' | 'PAUSED' | 'FINISHED'
  expectedDate: string
  units: [
    {
      tempId: number
      area: number
      bedroom: number
      balcony?: number
      livingroom?: number
      garages?: number
      suites?: number
      bathrooms: number
      image: {
        uploadId: string
        image: string
      }
    }
  ]
}

interface ICondominium {
  price: number
  name: string
  facilities: [{
    facility: string
    icon: string
  }]
}

interface IProperty extends Document {
  cod: string
  title: string
  subtitle?: string
  description: string
  type: 'APARTMENT' | 'PRIVATE_HOUSE' | 'HOUSE_IN_CONDOMINIUM' | 'RELEASE'
  floor?: number
  toRent: boolean
  toSell: boolean
  propertyArea?: number
  landArea?: number
  pictures?: object[]
  localization: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipcode: string
  }
  environments: {
    bedroom: number[]
    bathrooms: number[]
    suites: number[]
    kitchen: number[]
    garages: number[]
    livingroom: number[]
    balcony: number[]
  }
  release?: IRelease
  keywords: string[]
  condominium?: ICondominium
  views: [{
    count: number
    date: string
  }]
  price: {
    rent: number
    sale: number
  }
  user: any
  brokerName: string
  show: boolean
  nearby: INearby[]
}

const releaseSchema = new Schema<IRelease>({
  state: {
    type: String,
    required: true,
    enum: PROPERTY_RELEASE_STATE_VALID_TYPES
  },
  expectedDate: {
    type: String,
    required: true
  },
  units: {
    type: [
      {
        tempId: {
          type: Number,
          required: true
        },
        area: {
          type: Number,
          required: true
        },
        bedroom: {
          type: Number,
          required: true
        },
        balcony: {
          type: Number,
          required: false
        },
        livingroom: {
          type: Number,
          required: false
        },
        garages: {
          type: Number,
          required: false
        },
        suites: {
          type: Number,
          required: false
        },
        bathrooms: {
          type: Number,
          required: true
        },
        image: {
          uploadId: {
            type: String,
            required: false
          },
          fullPath: {
            type: String,
            require: false
          }
        }
      }
    ]
  }
}, { _id: false })

const condominiumSchema = new Schema<ICondominium>({
  price: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  facilities: {
    type: [
      {
        facility: {
          type: String,
          required: true
        },
        icon: {
          type: String,
          required: true
        }
      }
    ]
  }
}, { _id: false })

const nearbySchema = new Schema<INearby>({
  title: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
}, { _id: false })

const propertySchema = new Schema<IProperty>({
  cod: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(PROPERTY_VALID_TYPES)
  },
  floor: {
    type: Number,
    required: false
  },
  toRent: {
    type: Boolean,
    required: true
  },
  toSell: {
    type: Boolean,
    required: true
  },
  propertyArea: {
    type: Number,
    required: function () { return this.type !== RELEASE }
  },
  landArea: {
    type: Number,
    required: function () { return this.type === PRIVATE_HOUSE || this.type === HOUSE_IN_CONDOMINIUM }
  },
  pictures: {
    type: [Object],
    required: false
  },
  localization: {
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    complement: {
      type: String,
      required: false
    },
    neighborhood: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    }
  },
  environments: {
    bedroom: {
      type: [Number],
      required: function () { return this.type !== RELEASE }
    },
    bathrooms: {
      type: [Number],
      required: function () { return this.type !== RELEASE }
    },
    suites: {
      type: [Number],
      required: false
    },
    kitchen: {
      type: [Number],
      required: false
    },
    garages: {
      type: [Number],
      required: false
    },
    livingroom: {
      type: [Number],
      required: false
    },
    balcony: {
      type: [Number],
      required: false
    }
  },
  release: {
    type: releaseSchema,
    required: function () { return this.type === RELEASE }
  },
  keywords: {
    type: [String],
    required: true
  },
  condominium: {
    type: condominiumSchema,
    required: function () { return this.type === APARTMENT || this.type === HOUSE_IN_CONDOMINIUM || this.type === RELEASE }
  },
  views: {
    type: [{
      count: {
        type: Number,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    }],
    required: false
  },
  price: {
    rent: {
      type: Number,
      required: function () { return this.toRent }
    },
    sale: {
      type: Number,
      required: function () { return this.toSell }
    }
  },
  user: {
    type: Types.ObjectId,
    ref: UserModel,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  },
  nearby: {
    type: [nearbySchema],
    required: false
  }
}, { timestamps: true })

propertySchema.plugin(paginate)

const Property = model<IProperty, PaginateModel<IProperty>>('Property', propertySchema)

export default Property
