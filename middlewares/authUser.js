const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json("Access Denied")

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRT_KEY)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json(err)
  }
}

module.exports = authMiddleware
