const express = require('express')
const User = require('../model/user')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.find({}).exec()
  res.json(users)
})

router.post('/', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ error: 'Unprocessable Entity' })
  }

  User.create({ email, password }, (err, user) => {
    if (err) throw err
    return res.status(201).json(user)
  })
})

module.exports = router
