const db = require('../models')
const User = db.user
const List = db.list
const Stock = db.stock
const List_Stock = db.list_stock

// List Operationns
exports.createList = (req, res, next) => {
  List.create({
    name: req.body.name,
    userId: req.user.id
  }).then(() => {
    List.belongsTo(User)
    List.findAll({
      include: [{
        model: User,
        required: true
      }]
    }).then(list => {
      if (list) {
        res.status(201).json({ lists: list })
      }
    })
    
  })
  console.log(req.headers['x-access-token'], req.user.id)
  
  console.log(User)
}

// show all lists
exports.indexLists = (req, res, next) => {
  List.belongsToMany(Stock, { through: 'listsAndStocks' })
  List.findAll({
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
  List.belongsToMany(Stock, { through: 'listAndStocks' })
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
      res.status(400).json('List not found')
    }
    res.status(200).json({ list: list })
  })
}

// delete list
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
          ticker: req.body.ticker
        }
      }).then(listStock => {
        // if it exists, return
        if (listStock) {
          return res.status(400).json('Stock already exists')
        }
        // if the stock exists but not in this specific list, add a new relationship
        List_Stock.create({
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
          id: req.body.listId
        }
      }).then(list => {
        // create the stock with just a name and ticker
        Stock.create({
          name: req.body.name,
          ticker: req.body.ticker
        }).then(stock => {
          // declare the many to many relationship
          Stock.belongsToMany(List, { through: 'listsAndStocks' })
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

// select * from users join lists on users.id = lists.userId;
// SELECT `stocks`.`id`, `stocks`.`name`, `stocks`.`ticker`, `stocks`.`listId`, `stocks`.`createdAt`, `stocks`.`updatedAt`, 

// `lists`.`id` AS `lists.id`, 
// `lists`.`name` AS `lists.name`, 
// `lists`.`userId` AS `lists.userId`, 
// `lists`.`createdAt` AS `lists.createdAt`, 
// `lists`.`updatedAt` AS `lists.updatedAt`, 
// `lists->listsAndStocks`.`createdAt` AS `lists.listsAndStocks.createdAt`, `lists->listsAndStocks`.`updatedAt` AS `lists.listsAndStocks.updatedAt`, `lists->listsAndStocks`.`listId` AS `lists.listsAndStocks.listId` 

// FROM `stocks` 
// AS `stocks` 

// INNER JOIN ( `listsAndStocks` AS `lists->listsAndStocks` INNER JOIN `lists` AS `lists` ON `lists`.`id` = `lists->listsAndStocks`.`listId`) 
// ON `stocks`.`id` = `lists->listsAndStocks`.`listId`;

// SELECT `stocks`.`id`, `stocks`.`name`, `stocks`.`ticker`, `stocks`.`listId`, `stocks`.`createdAt`, `stocks`.`updatedAt`, 
// `lists`.`id` AS `lists.id`, 
// `lists`.`name` AS `lists.name`, 
// `lists`.`userId` AS `lists.userId`, 
// `lists`.`createdAt` AS `lists.createdAt`, 
// `lists`.`updatedAt` AS `lists.updatedAt`, 
// `lists->listsAndStocks`.`createdAt` AS `lists.listsAndStocks.createdAt`, `lists->listsAndStocks`.`updatedAt` AS `lists.listsAndStocks.updatedAt`, `lists->listsAndStocks`.`stockId` AS `lists.listsAndStocks.stockId`, 
// `lists->listsAndStocks`.`listId` AS `lists.listsAndStocks.listId` 

// FROM `stocks` 
// AS `stocks` 
// INNER JOIN ( `listsAndStocks` AS `lists->listsAndStocks` INNER JOIN `lists` AS `lists` ON `lists`.`id` = `lists->listsAndStocks`.`listId`) 

// ON `stocks`.`id` = `lists->listsAndStocks`.`stockId`;