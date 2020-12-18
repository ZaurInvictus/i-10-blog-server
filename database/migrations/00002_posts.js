
exports.up = function(knex) {
    return knex.schema
    .createTable('posts', tbl => {
        tbl.increments()
        tbl.string('post', 10000).notNullable()
        tbl.string('comment', 1000).notNullable()
     
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
    })
        
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('posts')
  }

