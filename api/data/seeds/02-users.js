const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  
      return knex('users').insert([
        { username: 'test1', password: bcrypt.hashSync('password', 8), name: 'Fred', email:'fred@test.com' },
        { username: 'test2', password: bcrypt.hashSync('password', 8), name: 'Shaggy', email:'shaggy@test.com' },
        { username: 'test3', password: bcrypt.hashSync('password', 8), name: 'Scooby', email:'scooby@test.com' }
      ]);
};
