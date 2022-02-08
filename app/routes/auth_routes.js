const { verifySignUp } = require('../middleware')
const { signup, signin, changepassword} = require('../controllers/auth_controller')

const express = require('express')
const router = express.Router()

router.post('/signup', verifySignUp.checkDuplicateUsernameOrEmail, signup)
router.post('/signin', signin)
router.post('/change-password', changepassword)

module.exports = router
