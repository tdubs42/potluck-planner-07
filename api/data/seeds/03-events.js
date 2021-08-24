
exports.seed = function(knex) {
 
      return knex('events').insert([
        { organizer_id: 1, title: `Fred's birthday`, date: '07-07-2022', time: '3:00', location:'home' },
        { organizer_id: 2, title: `Shaggy's birthday`, date: '07-07-2022', time: '3:00', location:'home' },
        { organizer_id: 3, title: `Scooby's birthday`, date: '07-07-2022', time: '3:00', location:'home' }
      ]);
};
