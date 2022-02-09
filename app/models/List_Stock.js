module.exports = (sequelize, Sequelize) => {
  const List_Stock = sequelize.define('listsAndStocks', {
    userId: {
      type: Sequelize.STRING
    },
    listId: {
      type: Sequelize.STRING
    },
    stockId: {
      type: Sequelize.STRING
    },
    ticker: {
      type: Sequelize.STRING
    }
  })
  return List_Stock
}
