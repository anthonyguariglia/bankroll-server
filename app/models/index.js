const config = require('../../config/db_config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: config.dialect,
    ssl: config.ssl,
    operatorsAliases: false,
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
  },
  
)

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  user: require('./user-model')(sequelize, Sequelize),
  list: require('./list')(sequelize, Sequelize),
  stock: require('./stock')(sequelize, Sequelize),
  list_stock: require('./List_Stock')(sequelize, Sequelize)
}

module.exports = db