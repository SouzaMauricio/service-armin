import express, { Express } from 'express'
import { routes } from './src/router/routes'
import formData from 'express-form-data'
import morgan from 'morgan'
import os from 'os'
import partialResponse from 'express-partial-response'

const app: Express = express()
const port = process.env.PORT
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
}

app.use(partialResponse())
app.use(formData.parse(options))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())
app.use(morgan(':method :url :status :res[content-length] - :remote-addr - :response-time ms'))
app.use(routes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${String(port)}`)
})
