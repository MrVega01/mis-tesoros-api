const mysql = require('mysql2/promise')
const { DATABASE_CREDENTIALS } = require('./src/utils/constants')

const createConnection = async () => {
  return await mysql.createConnection(DATABASE_CREDENTIALS)
}

module.exports = createConnection
