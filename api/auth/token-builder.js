const jwt = require('jsonwebtoken')
const { secret } = require('../secrets')

function buildToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

module.exports = {
    buildToken
}