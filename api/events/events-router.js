const express = require('express')
const router = express.Router()
const Events = require('./events-model')
const { validateEvent } = require('../middleware/events-middleware')
const { restricted } = require('../auth/auth-middleware')

router.get('/', restricted, (req, res, next) => {
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

router.post('/', validateEvent, (req, res, next) => {
    const newEvent = req.body
    Events.add(newEvent)
        .then(event => {
            res.status(201).json({ message: `You have successfully created the event: ${event.title}`, event})
        })
        .catch(next)
})

router.put('/:id', validateEvent, (req, res, next) => {
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
        res.status(202).json(await Events.remove(req.params.id))
    } catch (err) {
        next()
    }
})

module.exports = router