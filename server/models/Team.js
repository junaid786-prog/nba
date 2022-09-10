const mongoose = require("mongoose")
const TeamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    require: [true, "Team name is must"],
    maxlength: [20, "Team name cannot be of more than 20 characters"],
  },
  team_players: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "player",
    },
  ],
  team_owner: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: [true, "Team owner is must"],
  },
})
module.exports = mongoose.model("team", TeamSchema)
