import bodyParser from 'body-parser'
import express from 'express'
import * as Property from './property'
import * as Login from './login'

const routes = express()

routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

routes.use(Property.routes)
routes.use(Login.routes)

export {
  routes
}
