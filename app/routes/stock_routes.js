const express = require('express')
const router = express.Router()

const db = require('../models')
const List = db.list
const User = db.user

const { createList, deleteList, createStock } = require('../controllers/stock_controller')

router.post('/lists', createList)
router.delete('/lists/:id', deleteList)

router.post('/stocks', createStock)

module.exports = router