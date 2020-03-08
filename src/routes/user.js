import express from 'express'
import { Address, User } from '../models'

const router = express.Router()

router.get('/getusers', async (req, res) => {
  const users = await User.find()
    .populate('address')
    .sort('name')

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

    const address = await Address.create(addressPayload)

    await user.update({ address: address._id })

    res.status(201).json({ user })
  } catch {
    res.status(405).json({ message: 'Invalid input' })
  }
})

router.get('/getusersById/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId).populate('address')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch {
    res.status(400).json({ message: 'Invalid user id' })
  }
})

router.put('/updateUsersById/:userId', async (req, res) => {
  const { userId } = req.params

  const { name, email, birthDate } = req.body

  try {
    const payload = { name, email, birthDate }

    const opt = { new: true }

    const user = await User.findOneAndUpdate({ _id: userId }, payload, opt)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch {
    res.status(405).json({ message: 'Invalid input' })
  }
})

router.delete('/deleteUsersById/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.remove()

    res.status(200).json({ message: 'ok' })
  } catch {
    res.status(400).json({ message: 'Invalid user id' })
  }
})

export default router
