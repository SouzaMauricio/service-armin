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
let credentials = {}

try {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8')
  const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8')
  const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8')

  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  }
} catch (e) {
}

http.createServer(app).listen(port)
https.createServer(credentials, app).listen(443)
