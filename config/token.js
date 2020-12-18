const jwt = require('jsonwebtoken')
const secrets = require('../config/secret.js')


// GENERATING TOKEN
function generateToken(user) {
  const payload = {
    user_id: user.id,
    email: user.email,
    role: user.role,
    // firstName: user.first_name,
    // lastName: user.last_name
  }
  const options = {
     expiresIn: '8h'
     //expiresIn: '1000ms' // 2 mins
  }
   return jwt.sign(payload, secrets.jwtSecret, options)
}


module.exports = generateToken