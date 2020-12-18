const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../config/token')
const { check, validationResult } = require('express-validator')
const Users = require('../models/user-models')



router.post('/', 
[
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
],
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let { email, password } = req.body

  try {
    let user = await Users.findBy({ email })
    if (!user) {
      return res
        .status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    // Invalid credentials
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const token = generateToken(user)
    res.status(200).json({
      email: user.email,
      message: `Welcome!`,
      id: user.id, 
      role: user.role, 
      token: token
    })
  } catch(error) {
    res.status(500) 
    .json({ errors: [{ msg: "Sorry, but something went wrong while logging in. Please try again later or contact info@ebien.com" }] })
  }
})



module.exports = router