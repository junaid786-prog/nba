import "./App.css"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"
import Registeration from "./pages/Registeration"
import PlayerDetails from "./components/PlayerDetails"
function App() {
  // fetch("https://api-nba-v1.p.rapidapi.com/players?team=1&season=2021", options)
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err))
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/account" element={<Registeration />} />
        <Route exact path="/player/:id" element={<PlayerDetails />} />
      </Routes>
    </div>
  )
}

export default App
