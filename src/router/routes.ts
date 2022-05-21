import bodyParser from 'body-parser'
import express from 'express'
import * as Property from './property'
import * as Login from './login'
import * as Contact from './contact'
import * as ContactUs from './contactUs'

const routes = express()

routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

routes.use(Property.routes)
routes.use(Login.routes)
routes.use(Contact.routes)
routes.use(ContactUs.routes)

export {
  routes
}
