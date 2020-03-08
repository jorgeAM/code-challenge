import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'

describe('Users Endpoints', () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URL

    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  it('should list all users', async () => {
    const res = await request(app).get('/users/getusers')

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('users')
  })
})
