const db = require('../data/db-config')

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    update,
    remove,
    addGuest,
    findGuestsByEvent,
    findSpecificGuest,
    updateGuest,
    removeGuest,
    addItem,
    findItemsByEvent,
    updateItem,
    removeItem
}

function findAll() {
    return db('events')
}

function findBy(filter) {
    return db('events').where(filter)
}

function findById(id) {
    return db('events').where('event_id', id).first()
}

async function add(event) {
    return db('events').insert(event, 'event_id').then(([id]) => {
        return findById(id)
    })
}

async function update(id, newInfo) {
    return db('events').where('event_id', id).update(newInfo)
}

async function remove(id) {
    const removed = await db('events').where('event_id', id).first()
    await db('events').del().where('event_id', id)
    return removed
}

async function addGuest(event_id, guest) {
    return db('guests').insert({event_id, user_id: guest.user_id, attending: guest.attending})
    .returning()
    .then((guest) => {
        findGuestsByEvent(guest.event_id)
    })
}

function findGuestsByEvent(id) {
    return db('events as e')
			.join('guests as g', 'g.event_id', 'e.event_id')
			.join('users as u', 'u.user_id', 'g.user_id')
			.where('e.event_id', id)
			.select('u.user_id', 'u.name', 'g.attending')
			.orderBy('u.user_id')
}

function findSpecificGuest(event_id, user_id) {
    return db('guests as g')
            .join('users as u', 'u.user_id', 'g.user_id')
            .where({event_id, user_id})
            .first()
}


function updateGuest(event_id, user_id, changes) {
    return db('guests')
			.where({ event_id, user_id })
			.returning()
			.update(changes)
			.then(count => (count !== 0 ? findGuestsByEvent(event_id) : null))
}

async function removeGuest(event_id, user_id) {
    return db('guests').del().where({ event_id, user_id })
}

async function addItem(event_id, item) {
    return db("items")
        .insert({
            event_id,
            item_name: item.item_name
        })
        .returning()
        .then(() => findItemsByEvent(event_id));
}

function findItemsByEvent(id) {
    return db('items as i')
            .join('events as e', 'i.event_id', 'e.event_id')
            .leftJoin('users as u', 'u.user_id', 'i.user_id')
            .where('e.event_id', id)
            .select('i.item_name', 'u.name', 'e.title')
            .orderBy('i.item_name')
}

async function updateItem(event_id, newInfo) {
    return db('items')
             .where({ event_id, item_name: newInfo.item_name})
             .update(newInfo)
             .then(count => (count !== 0 ? findItemsByEvent(event_id) : null))
}

async function removeItem(event_id, item_name) {
    return db('items')
            .del()
            .where({ event_id, item_name})
}