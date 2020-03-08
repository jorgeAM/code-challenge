import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'

const req = request(app)

describe('Users Endpoints', () => {
  let payload

  beforeAll(async () => {
    const url = process.env.MONGO_URL

    payload = {
      name: 'some random name',
      email: 'test@gmail.com',
      birthDate: '1405-12-31',
      address: {
        street: 'my home',
        state: 'some state',
        city: 'Lima',
        country: 'Peru',
        zip: '13003'
      }
    }

    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  it('should list all users', async () => {
    const res = await req.get('/users/getusers')

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('users')
  })

  it('fails if we try to create a user with wrong payload', async () => {
    const res = await req.post('/users/createUsers').send({})

    expect(res.status).toBe(405)

    expect(res.body.message).toBe('Invalid input')
  })

  it('creates a new user', async () => {
    const res = await req.post('/users/createUsers').send(payload)

    const expected = {
      name: payload.name,
      email: payload.email,
      birthDate: '1405-12-31T00:00:00.000Z'
    }

    expect(res.status).toBe(201)

    expect(res.body.user).toMatchObject(expected)

    await req.del(`/users/deleteUsersById/${res.body.user._id}`)
  })

  it('fails to retrieve a user if user does not exist', async () => {
    const id = '5e630e0fc9dc812e7562343b'

    const res = await req.get(`/users/getusersById/${id}`)

    expect(res.status).toBe(404)

    expect(res.body.message).toBe('User not found')
  })

  it('fails to retrieve a user if userId is invalid', async () => {
    const id = '1'

    const res = await req.get(`/users/getusersById/${id}`)

    expect(res.status).toBe(400)

    expect(res.body.message).toBe('Invalid user id')
  })

  it('retrieves a user', async () => {
    const resNewUser = await req.post('/users/createUsers').send(payload)

    const id = resNewUser.body.user._id

    const res = await req.get(`/users/getusersById/${id}`)

    const expected = {
      name: payload.name,
      email: payload.email,
      birthDate: '1405-12-31T00:00:00.000Z'
    }

    expect(res.status).toBe(200)

    expect(res.body.user).toMatchObject(expected)

    await req.del(`/users/deleteUsersById/${id}`)
  })

  it('fails to delete a user if user does not exist', async () => {
    const id = '5e630e0fc9dc812e7562343b'

    const res = await req.del(`/users/deleteUsersById/${id}`)

    expect(res.status).toBe(404)

    expect(res.body.message).toBe('User not found')
  })

  it('fails to delete a user if userId is invalid', async () => {
    const id = '1'

    const res = await req.del(`/users/deleteUsersById/${id}`)

    expect(res.status).toBe(400)

    expect(res.body.message).toBe('Invalid user id')
  })

  it('deletes a user', async () => {
    const resNewUser = await req.post('/users/createUsers').send(payload)

    const id = resNewUser.body.user._id

    const res = await req.del(`/users/deleteUsersById/${id}`)

    expect(res.status).toBe(200)

    expect(res.body.message).toBe('ok')
  })
})
