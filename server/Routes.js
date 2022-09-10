const express = require("express")
const {
  addNewPlayer,
  findPlayer,
  myAllPlayers,
  deletePlayer,
} = require("./controllers/PlayerController")
const { createMyTeam, deleteMyTeam } = require("./controllers/teamController")
const {
  registerUser,
  loginUser,
  logout,
  _getProfile,
} = require("./controllers/userController")
const { _isAuthorizedUser } = require("./utility/Authorization")

const Router = express.Router()

Router.route("/user/register").post(registerUser)
Router.route("/user/login").post(loginUser)
Router.route("/user/logout").get(logout)
Router.route("/user/me/dashboard").get(_isAuthorizedUser, _getProfile)

Router.route("/team/create").post(_isAuthorizedUser, createMyTeam)
Router.route("/team/delete").delete(_isAuthorizedUser, deleteMyTeam)

Router.route("/player/add").post(_isAuthorizedUser, addNewPlayer)
Router.route("/player/detail/:id").get(_isAuthorizedUser, findPlayer)
Router.route("/players/all").get(_isAuthorizedUser, myAllPlayers)
Router.route("/player/delete/:id").delete(_isAuthorizedUser, deletePlayer)

module.exports = Router
