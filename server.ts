import express, { Express } from 'express'
import { routes } from './src/router/routes'

const app: Express = express()
const port = process.env.PORT

app.use(routes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${String(port)}`)
})
