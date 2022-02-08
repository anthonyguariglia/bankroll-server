const db = require('../models')
const User = db.user
const List = db.list
const Stock = db.stock

// List Operationns
exports.createList = (req, res, next) => {
  List.create({
    name: req.body.name,
    userId: req.user.id
  }).then(list => {
    if (list) {
      res.status(201).json({ list: list })
    }
  })
  console.log(req.headers['x-access-token'], req.user.id)
  List.belongsTo(User)
  console.log(User)
}

exports.deleteList = (req, res, next) => {
  List.destroy({
    where: {
      id: req.params.id
    }
  }).then(list => {
    res.status(203).json({ list: list })
  })
}

// Stock Operations
exports.createStock = (req, res, next) => {
  Stock.create({
    name: req.body.name,
    ticker: req.body.ticker,
    currentPrice: req.body.currentPrice,
    lastClosePrice: req.body.lastClosePrice
  }).then(stock => {
    // stock.belongsTo(List)
    res.status(201).json({ stock: stock })
  })
  Stock.belongsTo(List)
}
