
exports.seed = function(knex) {
 
      return knex('items').insert([
        {item_name: 'catnip', user_id: 1, event_id: 2},
        {item_name: 'milk', user_id: 2, event_id: 3},
        {item_name: 'salmon', user_id: 3, event_id: 1}
      ]);
};
