module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("stocks", {
    name: {
      type: Sequelize.STRING
    },
    ticker: {
      type: Sequelize.STRING
    },
    currentPrice: {
      type: Sequelize.DOUBLE
    },
    lastClosePrice: {
      type: Sequelize.DOUBLE
    }
  })
  // List.hasMany(Stock, { as: 'stocks' })
  return Stock
}
