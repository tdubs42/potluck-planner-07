
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        { title: 'test1', month: 'July', day: '14', year: '2022', location:'home' },
        { title: 'test2', month: 'July', day: '14', year: '2022', location:'home' },
        { title: 'test3', month: 'July', day: '14', year: '2022', location:'home' }
      ]);
    });
};
