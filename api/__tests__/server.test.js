const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const { set } = require('../server')

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

describe('/api/auth', () => {

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
})

describe('/api/users', () => {
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
})

describe('/api/events', () => {
  
  describe('[POST] /api/events', () => {
    it('returns with a 201 OK status', async () => {
      const newEvent = {title: 'test4', month: 'October', day: 31, year: 2021, location: 'Pittsburgh, PA'}
      const res = await request(server).post('/api/events').send(newEvent)
      expect(res.status).toBe(201)
    })
    it('returns the newly created event', async () => {
      const newEvent = {title: 'test5', month: 'October', day: 31, year: 2021, location: 'Pittsburgh, PA'}
      const res = await request(server).post('/api/events').send(newEvent)
      expect(res.body.event).toMatchObject(newEvent)
    })
  })

  describe('[GET] /api/events', () => {
    it('should return a 200 OK status', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test1', password: '1234'})
      const login = await request(server).post('/api/auth/login').send({ username: 'test1', password: '1234' })
      const res = await request(server).get('/api/events').set({ authorization: login.body.token })
      expect (res.status).toBe(200)
    })
    it('should return JSON', async () => {
      const res = await request(server).get('/api/events')
      expect(res.type).toBe('application/json')
    })
    it('should recieve the correct number of events',async () => {
      await request(server).post('/api/auth/register').send({ username: 'test1', password: '1234'})
      const login = await request(server).post('/api/auth/login').send({ username: 'test1', password: '1234' })
      const res = await request(server).get('/api/events').set({ authorization: login.body.token })
      expect(res.body).toHaveLength(2)
    })
  })

  describe('[GET] /api/events/:id', () => {
    it('should return a 200 OK status', async () => {
      const res = await request(server).get('/api/events/1')
      expect(res.status).toBe(200)
    })
    it('should return the correct event', async () => {
      const res = await request(server).get('/api/events/1')
      expect(res.body).toMatchObject({day: 31, description: null, event_id: 1, location: "Pittsburgh, PA", month: "October", "title": "test4", user_id: null, year: 2021})
    })
  })

  describe('[PUT] /api/events/:id', () => {
    it('returns with a 200 OK status', async () => {
      const updatedEvent = {title: 'test4', month: 'October', day: 31, year: 2021, location: 'Cleveland, OH'}
      const res = await request(server).put('/api/events/1').send(updatedEvent)
      expect(res.status).toBe(200)
    })
  })

  describe('[DELETE] /api/events/:id', () => {
    it('returns with a 202 accepted status', async () => {
      const res = await request(server).delete('/api/events/4')
      expect(res.status).toBe(202)
    })
    it('deletes an event from the database', async () => {
      await request(server).delete('/api/events/1')
      const currentEvents = await db('events')
      expect(currentEvents).toHaveLength(1)
    })
  })
})