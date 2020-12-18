const router = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../config/token')
const Users = require('../models/user-models')
const { check, validationResult } = require('express-validator')


router.post('/', 
[ 
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 8 or more characters'
  ).isLength({ min: 8 })
],

 async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let { first_name, last_name, role, email, password } = req.body

  const hash = bcrypt.hashSync(password, 12)
  password=hash

   try {
    let user = await Users.findBy({ email })
    if (user) {
      return res.status(400).json({ 
        errors: [{ msg: 'E-mail already in use' }] 
      })
    }

     if(!first_name || !last_name || !role || !email || !password ) {
       return res.status(422).json({ 
         errors: [{msg:'Please fill in all fields of the form to register a user'}] 
       }) 
      } 

      const newUser = await Users.add({ 
        first_name, last_name, role, email, password
      })
      const token = generateToken(newUser)

      if(newUser) {
        return res.status(200).json({  
          msg: `Welcome ${newUser.first_name}. You have been successfully registered!`,
          //errors: [{ msg: `Welcome ${newUser.first_name}. You have been successfully registered!` }], 
          id: newUser.id, 
          role: newUser.role,
          token: token
        })
      }

   } catch (err) {
    res.status(500)
    .json({ err, errors: 
      [{msg:'Error registering. Please check the data entered or contact info@ebien.com'}] 
    })
   }
})



module.exports = router




