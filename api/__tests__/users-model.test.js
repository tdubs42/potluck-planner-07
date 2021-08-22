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
    describe('Users.findById', () => {
        it('returns only one user', async () => {
            const user = await Users.findById(1)
            expect(user).toMatchObject({ user_id: 1, username: 'test1' })
        })
        it('returns the specified user requested', async () => {
            const user = await Users.findById(2)
            expect(user).toHaveProperty('username', 'test2')
        })
    })
})