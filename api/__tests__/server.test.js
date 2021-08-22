const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

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

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[GET] /api/users', () => {
  it('should return a 200 OK status', async () => {
    const res = await request(server).get('/api/users')
    expect (res.status).toBe(200)
  })
  it('should return JSON', async () => {
    const res = await request(server).get('/api/users')
    expect(res.type).toBe('application/json')
  })
})

describe('[GET] /api/users/:id', () => {
  it('should return a 200 OK status', async () => {
    const res = await request(server).get('/api/users/1')
    expect(res.status).toBe(200)
  })
  it('should return with the requested user', async () => {
    const res = await request(server).get('/api/users/1')
    expect(res.body).toHaveProperty('username', 'test1')
  })
})
