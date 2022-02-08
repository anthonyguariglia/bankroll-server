const express = require('express')
const router = express.Router()

const db = require('../models')
const List = db.list
const User = db.user

const { createList, deleteList, createStock, showList, indexLists } = require('../controllers/stock_controller')

router.post('/lists', createList)
router.delete('/lists/:id', deleteList)
router.get('/lists', indexLists)
router.get('/lists/:name', showList)

router.post('/stocks', createStock)

module.exports = router