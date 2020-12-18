 // PROTECTS RESTRICTED ROUTES
 const jwt = require('jsonwebtoken')
 const secrets = require('../config/secret.js')
 
 module.exports = (req, res, next) => {
   // Get token from header
   const token = req.headers.token

   // CHECKING THAT THE TOKEN IS VALID 
   if(token) {
     jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
       if(err) {
          res.status(401).json({
            errors: [{msg: 'Authorization denied, please login to proceed.'}]
        })
       } else {
         req.user = { 
          id: decodedToken.user_id,
          email: decodedToken.email,
          role: decodedToken.role,
        }
         next()
       }
     })
   } else {
     res.status(400).json({ 
      errors: [{msg: 'No token, authorization denied.'}]
    })
   }
 }
 