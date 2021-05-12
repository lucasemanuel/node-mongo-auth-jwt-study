const express = require('express')
const router = express.Router()

const User = require('../model/user')

const { authenticateCredentials, generateAccessToken } = require('../auth')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ error: 'Unprocessable Entity' })
  }

  const user = await User.findOne({ email }).exec()
  if (!user || authenticateCredentials(password, user.password)) {
    const jwt = generateAccessToken(user)
    return res.status(200).json(jwt)
  }

  return res.status(401).json({ error: 'Unauthorized' })
})

module.exports = router
