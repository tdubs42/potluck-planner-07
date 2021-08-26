const Events = require('../events/events-model')

module.exports = {
    validateEvent,
    validateEventId
}

function validateEvent(req, res, next) {
    if(!req.body.title || !req.body.title.trim()) {
        res.status(400).json({ message: 'A title is required.'})
    } else if(!req.body.date) {
        res.status(400).json({ message: 'A date is required.'})
    }   else if(!req.body.time) {
        res.status(400).json({ message: 'A time is required.'})
    } else if(!req.body.location || !req.body.location.trim()) {
        res.status(400).json({ message: 'A location is required.'})
    } else {
        next()
    }
}

async function validateEventId(req, res, next) {
   try {
       const event = await Events.findById(req.params.id)
       if (!event) {
           res.status(404).json({ message: `Event not found.`})
       } else {
           req.event = event
           next()
       }
   } catch (err) {
       next(err)
   }
}