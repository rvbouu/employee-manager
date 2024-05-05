const { Pool } = require('pg');

const pool = new Pool(
  {  
    // PostgreSQL username
    user: 'rvbou',
    // PostgreSQL password
    password: 'redrum',
    host: 'localhost',
    database: 'employees_db'
  }
)

module.exports = pool;