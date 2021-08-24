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
    removeGuest
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
			.select('u.user_id', 'u.username')
			.orderBy('u.user_id')
}

async function removeGuest(event_id, user_id) {
    return db('guests').del().where({ event_id, user_id })
}