const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ApiError = require("./ApiError")
const CatchAsync = require("./CatchAsync")
// for generalized user
exports._isAuthorizedUser = CatchAsync(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new ApiError("login first to access", 401)
  let jwtData = jwt.verify(token, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  let user = await User.findById(jwtData.id)
  req.user = user
  next()
})
