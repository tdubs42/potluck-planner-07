const express = require('express')
const router = express.Router()
const Users = require('./users-model')

router.get('/', (req, res, next) => {
    Users.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Users.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
})

module.exports = router