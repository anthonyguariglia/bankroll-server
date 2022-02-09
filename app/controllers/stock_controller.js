const res = require('express/lib/response')
const db = require('../models')
const stock = require('../models/stock')
const User = db.user
const List = db.list
const Stock = db.stock
const List_Stock = db.list_stock

/* User Operations */

// Get User Data
exports.getuser = (req, res, next) => {
  User.belongsToMany(List, { through: 'listsAndStocks'})
  User.belongsToMany(Stock, { through: 'listsAndStocks'})
  User.findOne({
    where: {
      id: req.user.id
    },
    include: {
      model: List,
      required: true,
      many: true
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json('User not found')
    }

    return res.status(200).json({ user: user })
  })
}

/* List Operations */

// Create list
exports.createList = (req, res, next) => {
  List.findOne({
    where: {
      userId: req.user.id,
      name: req.body.name
    },
  }).then(list => {
    if (list) {
      return res.status(400).json('List already exists')
    }

    List.create({
      name: req.body.name,
      userId: req.user.id
    }).then(() => {
      List.belongsTo(User, { through: 'listsAndStocks'})
      List.findAll({
        where: {
          userId: req.user.id
        },
        include: [{
          model: User,
          required: true
        }]
      }).then(list => {
        if (list) {
          return res.status(201).json({ lists: list })
        }
      })
      
    })
  })
}

// show all lists
exports.indexLists = (req, res, next) => {
  List.belongsToMany(Stock, { through: 'listsAndStocks' })
  List.findAll({
    where: {
      userId: req.user.id
    },
    include: {
      model: Stock
    }
  }).then(lists => {
    if (!lists) {
      res.status(400).json('No lists found')
    }
    res.status(200).json({ lists: lists })
  })
}

// find one list
exports.showList = (req, res, next) => {
  List.belongsToMany(Stock, { through: 'listsAndStocks' })
  List.findOne({
    where: {
      name: req.params.name
    },
    include: [{
      model: Stock,
      required: true
    }]
  }).then(list => {
    if (!list) {
      res.status(404).json('List not found')
    }
    res.status(200).json({ list: list })
  })
}

// delete list
exports.deleteList = (req, res, next) => {
  List.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  }).then(list => {
    if (!list) {
      return res.status(404).json('List not found')
    }

    return res.status(203).json({ Removed: list })
  })
}

/* Stock Operations */

// Create Stock
exports.createStock = (req, res, next) => {
  // look for stock in stock table
  Stock.findOne({
    where: {
      ticker: req.body.ticker
    }
  }).then(stock => {
    // if the stock exists, look for it in the listsAndStocks table
    if (stock) {
      List_Stock.findOne({
        where: {
          listId: req.body.listId,
          ticker: req.body.ticker,
          userId: req.user.id
        }
      }).then(listStock => {
        // if it exists, return
        if (listStock) {
          return res.status(400).json('Stock already exists')
        }
        // if the stock exists but not in this specific list for this specific user, add a new relationship
        List_Stock.create({
          userId: req.user.id,
          stockId: stock.id,
          listId: req.body.listId,
          ticker: stock.ticker
        }).then(listStock => {
          return res.status(200).json({ stocks: listStock })
        })
      })
    } else {
      // if the stock doesn't exist yet, find the list it's looking for
      List.findOne({
        where: {
          id: req.body.listId,
          userId: req.user.id
        }
      }).then(list => {
        if (!list) {
          return res.status(404).json('List does not exist')
        }

        // create the stock with just a name and ticker
        Stock.create({
          name: req.body.name,
          ticker: req.body.ticker
        }).then(stock => {
          // declare the many to many relationship to a given list
          Stock.belongsToMany(List, { through: 'listsAndStocks' })
          Stock.belongsToMany(User, { through: 'listsAndStocks' })
          Stock.findOne({
            where: {
              id: stock.id
            },
            include: {
              model: List
            }
          }).then(stock => {
            // now create the listsAndStocks relationship with this stock/list combo
            List_Stock.create({
              userId: req.user.id,
              stockId: stock.id,
              listId: list.id,
              ticker: stock.ticker
            }).then(listAndStock => {
              // return result
              return res.status(200).json({ stocks: listAndStock })
            })
          })
        })
      })
    }
  })
}

// index all stocks
exports.indexStocks = (req, res, next) => {
  Stock.belongsToMany(List, { through: 'listsAndStocks' })
  Stock.belongsToMany(User, { through: 'listsAndStocks' })
  Stock.findAll({
    include: {
      model: List
    }
  }).then(stocks => {
    if (!stocks) {
      return res.status(404).json('No stocks found!')
    }

    return res.status(200).json({ stocks: stocks })
  })
}

// remove stock from list
exports.removeStock = (req, res, next) => {
  List_Stock.destroy({
    where: {
      listId: req.body.listId,
      userId: req.body.userId,
      stockId: req.body.stockId
    }
  }).then(listStock => {
    if (!listStock) {
      return res.status(404).json('Stock not found')
    }

    return res.status(203).json({ Removed: listStock })
  })

}

/* List and Stock Operations */

// Pull list and stock data for current user
exports.getListAndStock = (req, res, next) => {
  List_Stock.findAll({
    where: {
      userId: req.user.id
    }
  }).then(data => {
    if (!data) {
      return res.status(404).json('No data found!')
    }

    return res.status(200).json({ data })
  })
}