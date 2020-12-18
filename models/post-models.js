const db = require('../database/db-config.js')

module.exports = {
  add,
  find,
  deleteById,
  findBy,
  findById,
  updateById,
}


// POSTGRE & SQLITE
async function add(post) {
  let ids = await db('posts').insert(post, 'id')
  const [id] = ids
  return findById(id) // returns the newly added record
}

// async function add(user) {
//   let [id] = await db("users").insert(user, "id")
//   return db('users').where({ id }).first()
// }

function find() {
  return db('posts').select('*')
}

function findBy(filter) {
  return db('posts').select('*').where(filter).first()
}

function findById(id) {
  return db('posts')
  .select('*').where({id}).first()
}


async function deleteById(id) {
  try {
      const delUserCount = await db('posts').where({
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


async function updateById(id, post) {
  try {
    const count = await db('posts').where({ id }).update(post)
    return count
  } catch (error) {
      return {
          message: error.message
      }
  }
}





