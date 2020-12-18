exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {
            first_name: 'Abby', 
            last_name: 'Wang',

            role: 'user',
            email: 'test@gmail.com',
            password: '123456',
  
            resetPasswordToken: 'fake token',
            resetPasswordExpires: Date.now()
          },
          {
            first_name: 'Luis', 
            last_name: 'Figo',

            role: 'user',
            email: 'test2@gmail.com',
            password: '456456',
  
            resetPasswordToken: 'fake token',
            resetPasswordExpires: Date.now()
          },
        ])
      })
  }