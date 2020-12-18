const router = require('express').Router()
const Users = require('../models/user-models')
const auth = require('../middleware/protected.js')
const checkRole = require('../middleware/checkRole.js')



// GET ALL USERS 
router.get('/', (req, res) => {
  Users.find()
   .then(users => {
      res.status(200).json(users)
   })
    .catch(err => res.send(err))
})



// GET USER BY EMAIL
router.post('/check/email', async (req, res) => {
   const { email } = req.body
   try {
     let user = await Users.findBy({ email })
     if (user) {
      return res.status(400).json({ 
        errors: [{ msg: 'E-mail already in use.' }] 
      })
     }

     res.status(200).json({
        success: [{ msg: 'Email is not in use' }] 
     })
   } catch(error) {
       res.status(500).json({
           errors: [{msg: "There was an error with the server."}], 
           error: error
       })
   }
})



// GET USER BY ID
router.get('/:id', async (req, res) => {
   const { id } = req.params
   try {
       const user = await Users.findById(id)
       if(!user) {
           return res.status(404).json({
               errors: [{msg: `Could not find item with ID: ${id}`}] 
           })
       }
       res.status(200).json(user)

   } catch(error) {
       res.status(500).json({
           errors: [{msg: "Server error. Please contact info@ebien.com for assistance."}], 
           error: error
       })
   }
})


// UPDATE
 router.put('/:id', async (req, res) => {
    const { id } = req.params
    const newItemData = req.body
    try {

        const updatedItem = await Users.updateById(id, newItemData)
        if(!updatedItem) {
             return res.status(400).json({
                errors: [{msg: `Could not find item with ID: ${id}`}] 
            })
        }

         // RETURN UPDATED USER
         const updatedUser = await Users.findById(id)
         res.status(200).json(updatedUser)
    } catch(error) {
        res.status(500).json({
            errors: [{ msg: 'Error updating user data.' }], 
            error: error
        })
    }
})




// DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const count = await Users.deleteById(id)
        if (!count) {
            return res.status(404).json({
                errors: [{ msg: `Could not find item with ID: ${id}` }], 
            })
        } 
        res.status(200).json(count)
    } catch(error) {
        res.status(500).json({
            errors: [{ msg: `Could not delete item with ID: ${id}` }], 
            error: error
        })
    }
})


 // GET USER LISTINGS BY USER ID
 router.get('/user-listings/:id', async (req, res) => {
    const { id } = req.params
    try {
        const userListings = await Users.getUserListings(id)
        if(!userListings || userListings.length < 1) {
            return res.status(404).json({
                errors: [{ msg: `No kits registered for the user.` }]
            })
        }
        res.status(200).json(userListings)
    } catch(error) {
        res.status(500).json({
            errors: [{ msg: `Error retrieving data, please try again later.` }], 
            error
        })
    }
})


module.exports = router