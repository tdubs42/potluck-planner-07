const Users = require('../users/users-model')

module.exports = {
    validateUser,
    usernameIsUnique,
}

function validateUser(req, res, next) {
    if(!req.body.username || !req.body.username.trim()) {
        res.status(422).json({ message: 'A username is required'})
    } else if (!req.body.password || !req.body.password.trim()) {
        res.status(422).json({ message: 'A password is required'})
    } else {
        next()
    }
}

function usernameIsUnique(req, res, next) {
    const { username } = req.body
    Users.findBy({ username })
        .then(([user]) => {
            if(user) {
                res.status(422).json({ messge: 'username taken'})
            } else {
                next()
            }
        })
}