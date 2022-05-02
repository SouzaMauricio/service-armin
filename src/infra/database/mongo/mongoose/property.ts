import { Schema, model } from 'mongoose'
import {
  APARTMENT,
  PRIVATE_HOUSE,
  HOUSE_IN_CONDOMINIUM,
  RELEASE,
  PROPERTY_VALID_TYPES
} from '../../../../domain/enums/property-valid-types'
import { PROPERTY_RELEASE_STATE_VALID_TYPES } from '../../../../domain/enums/property-release-state-valid-values'

interface IRelease {
  state: 'NOT_STARTED' | 'STARTED' | 'PAUSED' | 'FINISHED'
  expectedDate: string
  units: [
    {
      title: string
      bedroom: number[]
      balcony: number[]
      livingroom: number[]
      garages: number[]
      suites: number[]
      bathrooms: number[]
      images: [{
        uploadId: string
        image: string
      }]
    }
  ]
}

interface IProperty {
  cod: string
  title: string
  subtitle: string
  description: string
  type: 'APARTMENT' | 'PRIVATE_HOUSE' | 'HOUSE_IN_CONDOMINIUM' | 'RELEASE'
  floor: number
  toRent: boolean
  toSell: boolean
  propertyArea: number
  landArea: number
  pictures: object[]
  localization: {
    street: string
    number: number
    complement: string
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
  release: IRelease
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
        title: {
          type: String,
          required: true
        },
        bedroom: {
          type: [Number],
          required: true
        },
        balcony: {
          type: [Number],
          required: true
        },
        livingroom: {
          type: [Number],
          required: true
        },
        garages: {
          type: [Number],
          required: true
        },
        suites: {
          type: [Number],
          required: true
        },
        bathrooms: {
          type: [Number],
          required: true
        },
        images: {
          type: [{
            uploadId: {
              type: String,
              required: true
            },
            image: {
              type: String,
              require: true
            }
          }]
        }
      }
    ]
  }
})

const propertySchema = new Schema<IProperty>({
  cod: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    require: true,
    enum: Object.values(PROPERTY_VALID_TYPES)
  },
  floor: {
    type: Number,
    required: function () { return this.type === APARTMENT }
  },
  toRent: {
    type: Boolean,
    require: true
  },
  toSell: {
    type: Boolean,
    require: true
  },
  propertyArea: {
    type: Number,
    required: true
  },
  landArea: {
    type: Number,
    required: function () { return this.type === PRIVATE_HOUSE || this.type === HOUSE_IN_CONDOMINIUM }
  },
  pictures: {
    type: [Object],
    required: true
  },
  localization: {
    street: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    complement: {
      type: String,
      required: true
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
      required: true
    },
    bathrooms: {
      type: [Number],
      required: true
    },
    suites: {
      type: [Number],
      required: true
    },
    kitchen: {
      type: [Number],
      required: true
    },
    garages: {
      type: [Number],
      required: true
    },
    livingroom: {
      type: [Number],
      required: true
    },
    balcony: {
      type: [Number],
      required: true
    }
  },
  release: {
    type: releaseSchema,
    required: function () { return this.type === RELEASE }
  }
}, { timestamps: true })

const Property = model<IProperty>('Property', propertySchema)

export default Property
