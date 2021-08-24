const { secret } = require('../secrets')
const jwt = require('jsonwebtoken')



const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        res.status(401).json({ message: 'Token required'})
    } 
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          next({ status: 401, message: 'Token invalid'})
        } else {
          req.decoded = decoded
          next()
        }
      })
}
module.exports = {
    restricted
}