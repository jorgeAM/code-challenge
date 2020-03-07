import express from 'express'
import User from '../models/user'

const router = express.Router()

router.get('/getusers', async (req, res) => {
  const users = await User.find().sort('name')

  res.status(200).json({ users })
})

export default router
