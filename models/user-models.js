const db = require('../database/db-config.js')

module.exports = {
  add,
  find,
  deleteById,
  findBy,
  findById,
  updateById,
  updateByEmail,
  getUserListings,

  updateByToken,
  updateByPasswordResetToken
}


// POSTGRE & SQLITE
async function add(user) {
  let ids = await db('users').insert(user, 'id');
  const [id] = ids;
  return findById(id); // returns the newly added record
}


// async function add(user) {
//   let [id] = await db("users").insert(user, "id")
//   return db('users').where({ id }).first()
// }


function find() {
  return db('users').select( //'*'
     "id",
     "first_name",
     "last_name",
     "email",
     'role',
     "resetPasswordToken",
     "resetPasswordExpires",
     "created_at",
  )
}

function findBy(filter) {
  return db('users').select('*').where(filter).first()
}

function findById(id) {
  return db('users').select(
    "id",
     "first_name",
     "last_name",
     "email",
     'role',
     "resetPasswordToken",
     "resetPasswordExpires",
     "created_at",
  ).where({id}).first()
}


async function deleteById(id) {
  try {
      const delUserCount = await db('users').where({
          id
      }).del()
      return delUserCount
  } catch (error) {
      return {
          code: error.code,
          errno: error.errno,
          message: error.message,
      }
  }
}


async function updateById(id, user) {
  try {
    const count = await db('users').where({ id }).update(user)
    return count
  } catch (error) {
      return {
          message: error.message
      }
  }
}

async function updateByEmail(email, user) {
  try {
    const count = await db('users').where({ email }).update(user)
    return count
  } catch (error) {
      return {
          message: error.message
      }
  }
}

async function updateByToken(confirmationToken, user) {
  try {
    const count = await db('users').where({ confirmationToken }).update(user)
    return count
  } catch (error) {
      return {
          message: error.message
      }
  }
}

async function updateByPasswordResetToken(resetPasswordToken, user) {
  try {
    const count = await db('users').where({ resetPasswordToken }).update(user)
    return count
  } catch (error) {
      return {
          message: error.message
      }
  }
}


// GET ALL USER KITS BY USER ID
async function getUserListings(id) {
  try {
      const userListings = await db('users as u')
        .leftJoin('listings', 'u.id', 'listings.user_id')
        .select( //'*'
          'listings.id',
          'listings.title',
        )
        .where({ 'u.id': id })
      return userListings
  } catch (error) {
      return {
          message: error.message
      }
  }
}