const jwt = require('jsonwebtoken')
const config = require('../../config/auth_config')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).json('No token provided!')
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json('Unauthorized')
    }
    // console.log(decoded)
    req.user = {}
    req.user['id'] = decoded.id
    next()
  })
}

const authJwt = {
  verifyToken: verifyToken
}

module.exports = authJwt
