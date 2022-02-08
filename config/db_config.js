require('dotenv').config()

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
      ssl:'Amazon RDS'
  },
  pool: { maxConnections: 5, maxIdleTime: 30},
  language: 'en',
  DB: process.env.DB,
}