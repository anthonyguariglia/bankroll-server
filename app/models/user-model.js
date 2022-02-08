module.exports = (sequelize, Sequelize) => {
  // const List = require('./list')
  // const Stock = require('./stock')
  // const Stock = sequelize.define("stocks", {
  //   name: {
  //     type: Sequelize.STRING
  //   },
  //   ticker: {
  //     type: Sequelize.STRING
  //   }
  // })
  // const List = sequelize.define("lists", {
  //   name: {
  //     type: Sequelize.STRING
  //   }
  // })
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  })

  // User.hasMany(List, { as: 'lists' })

  // List.hasMany(Stock, { as: 'stocks' })
  
  return User
}