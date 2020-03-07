import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import user from './routes/user'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', user)

export default app
