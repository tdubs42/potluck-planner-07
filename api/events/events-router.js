const express = require('express')
const router = express.Router()
const Events = require('./events-model')
const { validateEvent, validateEventId } = require('../middleware/events-middleware')

router.get('/', (req, res, next) => {
    Events.findAll()
    .then(events => {
        res.status(200).json(events)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Events.findById(id)
    .then(event => {
        res.status(200).json(event)
    })
    .catch(next)
})


router.post('/',  (req, res, next) => {
    const newEvent = req.body
    Events.add(newEvent)
        .then(event => {
            res.status(201).json({ message: `You have successfully created the event: ${event.title}`, event})
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const changes = req.body
    Events.update(id, changes)
        .then((change) => {
            if(change === 1) {
                Events.findById(id)
                    .then(event => {
                        res.status(200).json({ message: `Event ${event.title} has been updated`, event})
                    })
                    .catch(next)
            }
        })
        .catch(next)
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Events.remove(req.params.id)
            .then(event => {
                res.status(202).json({message: `You have successfully removed event ${event.title}`, event})
            })
    } catch (err) {
        next()
    }
})

// Guests functions
router.get('/:id/guests', validateEventId, async (req, res, next) => {
    await Events.findGuestsByEvent(req.params.id)
        .then(guests => {
            res.status(200).json(guests)
        })
        .catch(next)
})

router.get('/:id/guests/:userId', validateEventId, (req, res, next) => {
    const id = req.params.id
    const userId = req.params.user_id
    Events.findSpecificGuest(id, userId)
        .then(guest => {
            res.status(200).json(guest)
        })
        .catch(next)
})

router.post('/:id/guests', async (req, res, next) => {
    const newGuest = req.body
    await Events.addGuest(req.params.id, newGuest)
        .then(guest => {
            res.status(201).json({ message: `You have successfully added a guest to the event list.`, guest})
        })
        .catch(next)
})

router.put('/:id/guests/:userId', validateEventId, async (req, res, next) => {
    
})

router.delete('/:id/guests', async (req, res, next) => {
    try {
        if(!req.body.user_id) {
            return res.status(400).json({ message: 'A user_id is required'})
        } else {
            const count = await Events.removeGuest(req.params.id, req.body.user_id)
            if (count !== 0) {
				const guests = await Events.findGuestsByEvent(req.params.id);
				res.status(200).json(guests)
			} else {
				res.status(404).json({
					message: 'Guest not found'
				})
            }
        } 
    } catch (error) {
		next(error)
    }
})

// Item functions
router.get('/:id/items', async (req, res, next) => {
    await Events.findItemsByEvent(req.params.id)
            .then(items => {
                res.status(200).json(items)
            })
            .catch(next)
})

router.post('/:id/items', async (req, res) => {
    await Events.addItem(req.params.id, req.body)
             .then(item => {
                 res.status(201).json(item)
             })
             .catch(next)
})

router.delete('/:id/items', async (req, res, next) => {
    try {
        if(!req.body.item_name) {
            return res.status(400).json({ message: 'An item name is required'})
        } else {
            const count = await Events.removeItem(req.params.id, req.body.item_name)
            if (count !== 0) {
                const items = await Events.findItemsByEvent(req.params.id)
                res.status(200).json(items)
            } else {
                res.status(404).json({ message: 'Item not found'})
            }
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router