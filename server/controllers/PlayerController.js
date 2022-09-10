const Player = require("../models/Player")
const Team = require("../models/Team")
const User = require("../models/User")
const ApiError = require("../utility/ApiError")
const CatchAsync = require("../utility/CatchAsync")

// 1. add new player
exports.addNewPlayer = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) throw new ApiError("user not found", 404)

  const { firstname, lastname, id, birth, leagues, nba, college, affiliation } =
    req.body
  const team = await Team.findById(user.team._id)
  if (team.team_players.length >= 5)
    throw new ApiError("max 5 players can be in a team", 400)

  const myPlayersIds = team.team_players
  for (let i = 0; i < myPlayersIds.length; i++) {
    let player = await Player.findById(myPlayersIds[i])
    if (player.id === id) throw new ApiError("player already added", 400)
  }

  const createdPlayer = await Player.create({
    firstname,
    lastname,
    id,
    birth,
    leagues,
    nba,
    college,
    affiliation,
  })

  team.team_players.push(createdPlayer._id)

  await team.save()
  await user.save()

  res.status(200).json({
    success: true,
    message: "new player added to team successfully",
    createdPlayer,
  })
})
// 2. read specific player
exports.findPlayer = CatchAsync(async (req, res) => {
  const foundPlayer = await Player.findById(req.params.id)
  if (!foundPlayer) throw new ApiError("player not found", 404)

  res.status(200).json({
    success: true,
    foundPlayer,
  })
})
// 3. read all players
exports.myAllPlayers = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) throw new ApiError("user not found", 404)

  if (!user.team) throw new ApiError("team not found", 404)

  const foundTeam = await Team.findById(user.team._id)
  if (!foundTeam) throw new ApiError("team not found", 404)

  const myPlayersIds = foundTeam.team_players
  let myPlayers = new Array()
  for (let i = 0; i < myPlayersIds.length; i++) {
    let player = await Player.findById(myPlayersIds[i])
    myPlayers.push(player)
  }
  res.status(200).json({
    success: true,
    myPlayers,
  })
})
// 4. delete specific player
exports.deletePlayer = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) throw new ApiError("user not found", 404)

  let team = await Team.findById(user.team._id)
  if (!team) throw new ApiError("team not found", 404)

  const { id } = req.params
  if (!id) throw new ApiError("enter id for player to be deleated", 404)

  const player = await Player.findById(id)
  if (!player) throw new ApiError("player not found", 404)

  let arr = new Array()
  for (let i = 0; i < team.team_players.length; i++) {
    if (team.team_players[i].toString() !== id.toString()) {
      arr.push(team.team_players[i])
    }
  }

  await player.delete()
  team.team_players = arr

  await team.save()

  res.status(200).json({
    success: true,
    message: "deleated from team successfully",
    players: team.team_players,
  })
})
