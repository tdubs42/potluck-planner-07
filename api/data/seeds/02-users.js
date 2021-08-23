
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').delete()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'test1', password: '1234' },
        { username: 'test2', password: '1234' },
        { username: 'test3', password: '1234' }
      ]);
    });
};
