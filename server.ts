import express, { Express } from 'express'
import { routes } from './src/router/routes'
import formData from 'express-form-data'
import morgan from 'morgan'
import os from 'os'
import partialResponse from 'express-partial-response'
import https from 'https'
import http from 'http'
import fs from 'fs'

const app: Express = express()
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

const port = process.env.PORT
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${String(port)}`)
// })

// SSL
let optionsSSL = {}
try {
  optionsSSL = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
  }
} catch (e) {
}

http.createServer(app).listen(port)
https.createServer(optionsSSL, app).listen(443)
