import bodyParser from 'body-parser'
import express from 'express'
import * as Property from './property'
import * as Login from './login'
import * as Contact from './contact'
import * as ContactUs from './contactUs'
import cors from 'cors'

const whitelist = process.env.WHITE_LIST!.toString().split(',')
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PATCH']
}

const routes = express()

routes.use(cors(corsOptions))
routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

routes.use(Property.routes)
routes.use(Login.routes)
routes.use(Contact.routes)
routes.use(ContactUs.routes)

export {
  routes
}
