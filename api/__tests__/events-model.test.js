const Events = require('../events/events-model')
const db = require('../data/db-config')

test('it is in the correct environment for tests', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('Event db access functions', () => {
    describe('Events.findAll', () => {
        it('returns all of the events in the table', async () => {
            const events = await Events.findAll()
            expect(events).toHaveLength(3)
        })
        it('returns the correct event shape', async () => {
            const events = await Events.findAll()
            expect(events[0]).toHaveProperty('title', `Fred's birthday`)
        })
    })
    describe('Events.findById', () => {
        it('returns only one event', async () => {
            const event = await Events.findById(1)
            expect(event).toHaveProperty('title', `Fred's birthday`)
        })
        it('returns the specified event requested', async () => {
            const event = await Events.findById(2)
            expect(event).toHaveProperty('title', `Shaggy's birthday`)
        })
    })
    describe('Events.add', () => {
        it('adds a new event to the table', async () => {
            const newEvent = { organizer_id: 1, title: 'birthday bash', date: '11-28-2022', time: '3:00', location:'home' }
            await Events.add(newEvent)
            const events = await db('events')
            expect(events).toHaveLength(4)
        })
        it('returns the newly created event', async () => {
            const event = { organizer_id: 1, title: 'birthday bash', date: '11-28-2022', time: '3:00', location:'home' }
            const newEvent = await Events.add(event)
            expect(newEvent).toHaveProperty('title', 'birthday bash')
        })
    })
    describe('Events.remove', () => {
        it('removes an event from the table', async () => {
            await Events.remove(4)
            const currentEvents = await db('events')
            expect(currentEvents).toHaveLength(3)
        })
        it('returns the deleted event', async () => {
            const removed = await Events.remove(3)
            expect(removed).toHaveProperty('title', `Scooby's birthday`)
        })
    })
})