const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: [true, "name is must"],
  },
  lastname: {
    type: String,
    require: [true, "name is must"],
  },
  birth: {
    date: Date,
    country: String,
  },
  leagues: {},
  nba: {
    start: Number,
    pro: Number,
  },
  college: String,
  affiliation: String,
  id: Number,
})

module.exports = mongoose.model("player", PlayerSchema)
