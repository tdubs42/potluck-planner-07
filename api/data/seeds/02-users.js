const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  
      return knex('users').insert([
        { username: 'fred', password: bcrypt.hashSync('password', 8), name: 'Fred', email:'fred@test.com' },
        { username: 'shaggy', password: bcrypt.hashSync('password', 8), name: 'Shaggy', email:'shaggy@test.com' },
        { username: 'scooby', password: bcrypt.hashSync('password', 8), name: 'Scooby', email:'scooby@test.com' }
      ]);
};
