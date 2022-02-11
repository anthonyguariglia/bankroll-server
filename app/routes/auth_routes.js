const { verifySignUp, authJwt } = require('../middleware')
const { signup, signin, changepassword, getuser, signout} = require('../controllers/auth_controller')

const express = require('express')
const router = express.Router()

router.post('/signup', verifySignUp.checkDuplicateUsernameOrEmail, signup)
router.post('/signin', signin)
router.patch('/change-password', changepassword)
router.delete('/signout', authJwt.verifyToken, signout )

module.exports = router
