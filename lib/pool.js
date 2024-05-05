const { Pool } = require('pg');

let config = {  
  // PostgreSQL username
  user: 'rvbou',
  // PostgreSQL password
  password: 'redrum',
  host: 'localhost',
  database: 'employees_db'
}


const pool = new Pool(config)

module.exports = pool;