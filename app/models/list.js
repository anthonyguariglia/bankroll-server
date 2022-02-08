const Stock = require('./stock')
const db = require('../models')
const User = db.user

module.exports = (sequelize, Sequelize) => {
  const List = sequelize.define("lists", {
    name: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.STRING
    }
  })
  // List.belongsTo(User, { as: 'lists' })
  return List
}