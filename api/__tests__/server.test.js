const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
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

describe('[POST] /api/auth/register', () => {
  it('returns with a 201 OK status', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'foo', password:'1234' })
    expect(res.status).toBe(201)
  })
  it('returns the newly created user', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'foo2', password: '1234' })
    expect(res.body.username).toContain('foo2')
  })
})

describe('[POST] /api/auth/login', () => {
  it('returns with a 200 OK status', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'foo2', password: '1234'})
    expect(res.status).toBe(200)
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
    expect(res.body).toHaveProperty('username', 'foo')
  })
})

describe('[PUT] /api/users/:id', () => {
  it('returns with a 200 OK status', async () => {
    const res = await request(server).put('/api/users/1').send({ username: 'test1', password: '1234'})
    expect(res.status).toBe(200)
  })
})

describe('[DELETE] /api/users/:id', () => {
  it('returns with a 202 accepted status', async () => {
    const res = await request(server).delete('/api/users/4')
    expect(res.status).toBe(202)
  })
  it('deletes a user from the database', async () => {
    await request(server).delete('/api/users/1')
    const currentUsers = await db('users')
    expect(currentUsers).toHaveLength(1)
  })
})
