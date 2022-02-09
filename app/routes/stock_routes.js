const express = require('express')
const router = express.Router()

const db = require('../models')
const List = db.list
const User = db.user

const { 
  createList, 
  deleteList, 
  createStock, 
  showList, 
  indexLists, 
  indexStocks, 
  getuser,
  removeStock,
  getListAndStock
} = require('../controllers/stock_controller')

// user routes
router.get('/', getuser)

// list routes
router.post('/lists', createList)
router.delete('/lists/:id', deleteList)
router.get('/lists', indexLists)
router.get('/lists/:name', showList)

// stock routes
router.post('/stocks', createStock)
router.get('/stocks', indexStocks)
router.patch('/stocks', removeStock)

// list and stock routes
router.get('/lists-stocks', getListAndStock)

module.exports = router