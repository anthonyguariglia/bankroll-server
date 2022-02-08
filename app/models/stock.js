module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("stocks", {
    name: {
      type: Sequelize.STRING
    },
    ticker: {
      type: Sequelize.STRING
    }
  })
  return Stock
}
