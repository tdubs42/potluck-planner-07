const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeAll(async () => {
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

describe('/api/auth', () => {

  describe('[POST] /api/auth/register', () => {
    it('returns with a 201 OK status', async () => {
      const res = await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' })
      expect(res.status).toBe(201)
    })
    it('returns the newly created user', async () => {
      const res = await request(server).post('/api/auth/register').send({ username: 'foo2', password: '1234', name: 'Shaggy', email: 'foo2@test.com' })
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
      await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' }) 
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const users = await request(server).get('/api/users').set({ authorization: res.body.token })
      expect (users.status).toBe(200)
    })
    it('should return JSON', async () => {
      const res = await request(server).get('/api/users')
      expect(res.type).toBe('application/json')
    })
  })

  describe('[GET] /api/users/:id', () => {
    it('should return a 200 OK status', async () => {
      await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' }) 
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const users = await request(server).get('/api/users').set({ authorization: res.body.token })
      expect(users.status).toBe(200)
    })
    it('should return with the requested user', async () => {
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const users = await request(server).get('/api/users').set({ authorization: res.body.token })
      expect(users.body[0]).toHaveProperty('username', 'fred')
    })
  })

  describe('[PUT] /api/users/:id', () => {
    it('returns with a 200 OK status', async () => {
      // const res = await request(server).put('/api/users/1').send({ username: 'test1', password: '1234', name: 'foo', email: 'test@test.com'})
      // expect(res.status).toBe(200)
    })
  })

  describe('[DELETE] /api/users/:id', () => {
    it('returns with a 202 accepted status', async () => {
      await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' }) 
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const deleted = await request(server).delete('/api/users/4').set({ authorization: res.body.token})
      expect(deleted.status).toBe(202)
    })
    it('deletes a user from the database', async () => {
      await request(server).delete('/api/users/1')
      const currentUsers = await db('users')
      expect(currentUsers).toHaveLength(4)
    })
  })
})

describe('/api/events', () => {
  
  describe('[POST] /api/events', () => {
    it('returns with a 201 OK status', async () => {
    //   const newEvent = { organizer_id: 1, title: 'birthday bash', date: '11-28-2022', time: '3:00', location:'home' }
    //   const res = await request(server).post('/api/events').send(newEvent)
    //   console.log('res.body', res.body)
    //   expect(res.status).toBe(201)
    })
    it('returns the newly created event', async () => {
      // const newEvent = { organizer_id: 4, title: 'test5', date: '12-28-2022', time: '3:00', location:'home' }
      // const res = await request(server).post('/api/events').send(newEvent)
      // expect(res.body.event).toMatchObject(newEvent)
    })
  })

  describe('[GET] /api/events', () => {
    it('should return a 200 OK status', async () => {
      await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' }) 
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const events = await request(server).get('/api/events').set({ authorization: res.body.token })
      expect (events.status).toBe(200)
    })
    it('should return JSON', async () => {
      const res = await request(server).get('/api/events')
      expect(res.type).toBe('application/json')
    })
    it('should recieve the correct number of events',async () => {
      await request(server).post('/api/auth/register').send({ username: 'test1', password: '1234', name: 'Foxy', email: 'test@test.com'})
      const res = await request(server).post('/api/auth/login').send({ username: 'test1', password: '1234' })
      const events = await request(server).get('/api/events').set({ authorization: res.body.token })
      expect(events.body).toHaveLength(3)
    })
  })

  describe('[GET] /api/events/:id', () => {
    it('should return a 200 OK status', async () => {
      await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' }) 
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const event = await request(server).get('/api/events/1').set({ authorization: res.body.token})
      expect(event.status).toBe(200)
    })
    it('should return the correct event', async () => {
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const event = await request(server).get('/api/events/1').set({ authorization: res.body.token})
      expect(event.body).toHaveProperty('title', `Fred's birthday`)
    })
  })

  describe('[PUT] /api/events/:id', () => {
    it('returns with a 200 OK status', async () => {
      await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' }) 
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const updatedEvent = { organizer_id: 1, title: 'birthday bash', date: '11-28-2022', time: '3:00', location:'home' }
      const newEvent = await request(server).put('/api/events/1').set({authorization: res.body.token}).send(updatedEvent)
      expect(newEvent.status).toBe(200)
    })
  })

  describe('[DELETE] /api/events/:id', () => {
    it('returns with a 202 accepted status', async () => {
      await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234', name: 'Fred', email:'foo@test.com' }) 
      const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234'})
      const deleted = await request(server).delete('/api/events/4').set({ authorization : res.body.token})
      expect(deleted.status).toBe(202)
    })
    it('deletes an event from the database', async () => {
      await request(server).delete('/api/events/1')
      const currentEvents = await db('events')
      expect(currentEvents).toHaveLength(3)
    })
  })
})