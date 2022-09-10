const Team = require("../models/Team")
const User = require("../models/User")
const ApiError = require("../utility/ApiError")
const CatchAsync = require("../utility/CatchAsync")

// 1. create new team
exports.createMyTeam = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) throw new ApiError("user not found", 404)

  //   if (user.team !== null)
  //     throw new ApiError("only one team can be created", 400)
  if (!req.body.teamName) throw new ApiError("team name cannot be empty", 404)
  const newTeam = await Team.create({
    team_name: req.body.teamName,
    team_owner: user._id,
  })
  user.team = newTeam._id
  await user.save()
  res.status(200).json({
    success: true,
    message: "team is successfully created",
    user,
    newTeam,
  })
})
// 2. delete my team

exports.deleteMyTeam = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) throw new ApiError("user not found", 404)
  const teamId = user.team._id
  const team = Team.findById(teamId)
  await team.delete()
  user.team = null
  await user.save()
  res.status(202).json({
    success: true,
    message: "team is successfully deleated",
    user,
  })
})
