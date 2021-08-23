const Events = require('../events/events-model')

module.exports = {
    validateEvent,
}

function validateEvent(req, res, next) {
    if(!req.body.title || !req.body.title.trim()) {
        res.status(400).json({ message: 'A title is required.'})
    } else if(!req.body.month || !req.body.month.trim()) {
        res.status(400).json({ message: 'A month is required.'})
    }  else if(!req.body.day) {
        res.status(400).json({ message: 'A day is required.'})
    } else if(!req.body.year) {
        res.status(400).json({ message: 'A year is required.'})
    } else if(!req.body.location || !req.body.location.trim()) {
        res.status(400).json({ message: 'A location is required.'})
    } else {
        next()
    }
}