const Team = require("../models/Team")
const User = require("../models/User")
const ApiError = require("../utility/ApiError")
const CatchAsync = require("../utility/CatchAsync")
const { _sendToken } = require("../utility/JWTToken")
const { createMyTeam } = require("./teamController")
exports.registerUser = CatchAsync(async (req, res) => {
  const { name, gmail, password } = req.body
  const alreadyExists = await User.findOne({ gmail: gmail })
  if (alreadyExists) throw new ApiError("User already exists", 402)
  const user = await User.create({
    name,
    gmail,
    password,
  })

  const newTeam = await Team.create({
    team_name: name + " team",
    team_owner: user._id,
  })
  const fUser = await User.findById(user._id)
  fUser.team = newTeam._id
  await fUser.save()
  _sendToken(user, 200, res)
})

exports.loginUser = CatchAsync(async (req, res, next) => {
  const { gmail, password } = req.body
  const user = await User.findOne({ gmail }).select("+password")
  if (!user) throw new ApiError("Invalid gmail or password", 402)
  let ok = await user.comparePasswords(password)
  if (!ok) throw new ApiError("Invalid gmail or password", 402)
  _sendToken(user, 200, res)
})

exports.logout = CatchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "logged out",
  })
})
// get profile
exports._getProfile = CatchAsync(async (req, res, next) => {
  const me = await User.findById(req.user.id)
  if (!me) throw new ApiError("cannot find user", 404)

  res.status(200).json({
    success: true,
    user: me,
  })
})
