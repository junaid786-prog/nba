const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const errorMiddelware = require("./utility/ErrorMiddelware")
const Router = require("./Routes")

require("dotenv").config()

const app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use("/api", Router)

app.use(errorMiddelware)
app.get("/", (req, res, next) => {
  res.send("app is running")
})

module.exports = app
