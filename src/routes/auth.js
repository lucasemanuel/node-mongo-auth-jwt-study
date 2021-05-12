const express = require('express')
const router = express.Router()

const User = require('../model/user')

const {
  authenticateCredentials,
  generateAccessToken,
  authenticateToken
} = require('../auth')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ error: 'Unprocessable Entity' })
  }

  const user = await User.findOne({ email }).exec()

  if (user) {
    if (authenticateCredentials(password, user.password)) {
      const jwt = generateAccessToken(user)
      return res.status(200).json(jwt)
    }
  }

  res.status(401).json({ error: 'Unauthorized' })
})

router.use((req, res, next) => {
  const token = req.headers.authorization
  if (!authenticateToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
})

router.post('/logout', (req, res, next) => {
  console.log('Logout')
  res.json({ message: 'Logout' })
  next()
})

module.exports = router
