const db = require('../data/db-config')

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    update,
    remove
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