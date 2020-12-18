const express = require('express')
const helmet = require('helmet') // adding Helmet to enhance API's security
const cors = require('cors') // enabling CORS for all requests

// IMPORT ROUTES
const register = require('../auth-routes/register')
const login = require('../auth-routes/login')
const users = require('../routes/user-routes')
const posts = require('../routes/post-routes')


const server = express()
// 3rd PARTY MIDDLEWARE
server.use(express.json())
server.use(helmet())
server.use(cors())


// ROUTES
server.use('/api/register', register)
server.use('/api/login', login)
server.use('/api/users', users)
server.use('/api/posts', posts)



// SERVER IS UP
server.get('/', (req, res) => {
    res.status(200).json({
      message: 'i-10 server is up'
    })
})
  
  
module.exports = server