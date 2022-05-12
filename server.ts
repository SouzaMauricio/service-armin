import express, { Express } from 'express'
import dotenv from 'dotenv'
import { routes } from './src/router/routes'
// import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(routes)

// app.use(cors())

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${String(port)}`)
})
