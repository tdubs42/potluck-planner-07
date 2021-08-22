const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config/secrets')

function buildToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, TOKEN_SECRET, options)
}

module.exports = {
    buildToken
}