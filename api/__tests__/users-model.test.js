const Users = require('../users/users-model')
const db = require('../data/db-config')

test('it is the correct environment for tests', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('User db access functions', () => {
    describe('Users.findAll', () => {
        it('returns all of the users in the table', async () => {
            const users = await Users.findAll()
            expect(users).toHaveLength(3)
        })
        it('returns the correct user shape', async () => {
            const users = await Users.findAll()
            expect(users[0]).toHaveProperty('username', 'test1')
        })
    })
})