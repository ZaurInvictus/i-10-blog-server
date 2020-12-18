
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments()
        tbl.string('first_name', 255).notNullable()
        tbl.string('last_name', 255).notNullable()
  
        tbl.string('email', 255).notNullable().unique()
        tbl.string('password', 255).notNullable()
        tbl.string('role').notNullable()  
  
        // Password reset
        tbl.string('resetPasswordToken')
        tbl.bigInteger('resetPasswordExpires', 10000)
     
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
    })
        
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
  }
