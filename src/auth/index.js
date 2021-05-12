const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

const authenticateCredentials = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const authenticateToken = authHeader => {
  const token = authHeader && authHeader.split(' ')[1]

  if (token) return jwt.verify(token, process.env.TOKEN_SECRET, () => {})
  return false
}

const generateAccessToken = user => {
  return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

module.exports = {
  authenticateCredentials,
  authenticateToken,
  generateAccessToken
}
