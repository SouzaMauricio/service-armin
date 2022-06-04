import express, { Express } from 'express'
import { routes } from './src/router/routes'
import formData from 'express-form-data'
import os from 'os'

const app: Express = express()
const port = process.env.PORT
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
}
app.use(formData.parse(options))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())
app.use(routes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${String(port)}`)
})
