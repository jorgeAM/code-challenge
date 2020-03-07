import express from 'express'
import { Address, User } from '../models'

const router = express.Router()

router.get('/getusers', async (req, res) => {
  const users = await User.find().sort('name')

  res.status(200).json({ users })
})

router.post('/createUsers', async (req, res) => {
  const { name, email, birthDate } = req.body

  const userPayload = {
    name,
    email,
    birthDate
  }

  try {
    const user = await User.create(userPayload)

    const addressPayload = {
      ...req.body.address,
      user: user._id
    }

    await Address.create(addressPayload)

    res.status(201).json({ user })
  } catch {
    res.status(405).json({ message: 'Invalid input' })
  }
})

router.get('/getusersById/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch {
    res.status(404).json({ message: 'Invalid user id' })
  }
})

router.delete('/deleteUsersById/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }

    await user.remove()

    res.status(200).json({ message: 'ok' })
  } catch {
    res.status(404).json({ message: 'Invalid user id' })
  }
})

export default router
