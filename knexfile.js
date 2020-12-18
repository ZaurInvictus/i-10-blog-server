require('dotenv').config()

// LOCAL POSTGRE SQL CONFIG
const localPg = {
  host: 'localhost',
  port: 5432, // You may need/want to change this
  database: 'template1',
  user: 'zaur', // User and pass may be different for you
  password: ""  
}


module.exports = {
  // POSTGRE SQL LOCAL
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: localPg,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },


  // POSTGRE SQL 
  // On Heroku should be set: DB_ENV=production
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL, 
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },


  // SQLITE
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/tester.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
}