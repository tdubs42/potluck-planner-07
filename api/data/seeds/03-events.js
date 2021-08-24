
exports.seed = function(knex) {
 
      return knex('events').insert([
        { organizer_id: 1, title: 'test1', date: '07-07-2022', time: '3:00', location:'home' },
        { organizer_id: 1, title: 'test2', date: '07-07-2022', time: '3:00', location:'home' },
        { organizer_id: 3, title: 'test3', date: '07-07-2022', time: '3:00', location:'home' }
      ]);
};
