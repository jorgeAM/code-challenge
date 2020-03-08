require('dotenv').config()

jest.setTimeout(50000)

process.env.MONGO_URL = process.env.MONGO_URI
