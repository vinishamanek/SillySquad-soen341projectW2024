const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    console.log(authHeader)
    return res.status(401).json({ success: false, message: 'Unauthorized in VerifyJWT' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden', success: false })
      }

      req.user = decoded.UserInfo.email
      req.user_flag = decoded.UserInfo.user_flag
      next()
    }

  )
}

module.exports = verifyJWT
