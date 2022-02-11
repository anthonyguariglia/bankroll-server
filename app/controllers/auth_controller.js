const db = require('../models')
const config = require('../../config/auth_config')
const User = db.user
const Op = db.Sequelize.Op

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.signup = (req, res) => {
  if (req.body.password !== req.body.password_confirmation) {
    return res.status(400).json('Passwords do not match')
  }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    lists: []
  }).then(user => {
    if (user) {
      res.status(201).json({ user: user })
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }
    const token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 86400 * 30
    })
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    })
  }).catch(err => {
    res.status(500).json(err.message)
  })
}

exports.changepassword = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Unauthorized'})
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).send({ message: 'Passwords do not match' })
    }
    user['password'] = bcrypt.hashSync(req.body.newPassword, 8)
    console.log(req.body.password, user.password)
    user.save()

    return res.status(200).send({ message: 'Password Successfully Changed'})
  })
}

exports.signout = (req, res) => {
  User.findOne({ 
    where: {
      id: req.user.id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json('User not found')
    }
    return res.status(200).json('Successfully signed out')
  })
}
