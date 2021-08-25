const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const { validateUser, usernameIsUnique } = require('../middleware/users-middleware')
const { buildToken } = require('./token-builder')

router.post('/register', validateUser, usernameIsUnique,  (req, res, next) => {
    const { username, password, name, email } = req.body

    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(password, rounds)

    const newUser = {
        username: username,
        password: hash,
        name: name,
        email: email
    }

     Users.add(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = buildToken(user)
          res.status(200).json({
            user_id: user.user_id,
            message: `welcome, ${username}`,
            token: token
          })
        } else {
          res.status(401).json({ message: 'invalid credentials'})
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
})

module.exports = router