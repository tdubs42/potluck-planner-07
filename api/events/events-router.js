const express = require('express')
const router = express.Router()
const Events = require('./events-model')
const { validateEvent } = require('../middleware/events-middleware')

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

router.post('/', validateEvent, (req, res, next) => {
    const newEvent = req.body
    Events.add(newEvent)
        .then(event => {
            res.status(201).json({ message: `You have successfully created the event: ${event.title}`, event})
        })
        .catch(next)
})


module.exports = router