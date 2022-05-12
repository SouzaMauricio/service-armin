import bodyParser from 'body-parser'
import express from 'express'
import * as Property from './property'

const routes = express()

routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

routes.use(Property.routes)

export {
  routes
}
