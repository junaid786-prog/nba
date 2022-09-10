import React, { useEffect, useState } from "react"
import axios from "axios"
import SearchIcon from "@mui/icons-material/Search"
import PlayerCard from "./PlayerCard"
import { RAPID_API_HOST, RAPID_API_KEY } from "../redux/constants"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, GetMyTeamAction } from "../redux/actions"
import { useAlert } from "react-alert"
const MyTeamTab = ({ setTabIndex }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetMyTeamAction)
    dispatch(clearErrors())
  }, [dispatch])
  const { loading, team } = useSelector((state) => state.myTeam)
  return !loading ? (
    <div className="my_team">
      <h3>My Team</h3>
      <div className="my_team_results">
        {team && team.length === 0 ? (
          <div className="empty_team">
            <p>Team is empty</p>
            <button onClick={() => setTabIndex(3)}>Add Player</button>
          </div>
        ) : (
          team &&
          team.map((player, index) => {
            return <PlayerCard player={player} key={index} />
          })
        )}
      </div>
    </div>
  ) : (
    <p>Loading</p>
  )
}

const ManageTeamTab = ({ setTabIndex }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetMyTeamAction)
    dispatch(clearErrors())
  }, [dispatch])
  const { loading, team } = useSelector((state) => state.myTeam)
  return !loading ? (
    <div className="my_team">
      <h3>Delete Player</h3>
      <div className="my_team_results">
        {team && team.length === 0 ? (
          <div className="empty_team">
            <p>Team is empty</p>
            <button onClick={() => setTabIndex(3)}>Add Player</button>
          </div>
        ) : (
          team &&
          team.map((player, index) => {
            return <PlayerCard player={player} key={index} remove={true} />
          })
        )}
      </div>
    </div>
  ) : (
    <p>Loading</p>
  )
}

const AddPlayerTab = () => {
  const [playerName, setPlayerName] = useState()
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState()
  const alert = useAlert()
  const dispatch = useDispatch()
  const { error, message } = useSelector((state) => state.addPlayer)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    } else if (message) alert.success(message)
  }, [alert, error, message, dispatch])

  const findPlayer = (name) => {
    setLoading(true)
    const options = {
      method: "GET",
      url: "https://api-nba-v1.p.rapidapi.com/players",
      params: { search: name },
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": RAPID_API_HOST,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setLoading(false)
        setPlayers(response.data.response)
        console.log(response.data)
      })
      .catch(function (error) {
        setLoading(false)
        setPlayers([])
        console.error(error)
      })
  }
  return (
    <div className="tab">
      <div className="search_input">
        <input
          type="text"
          placeholder="Enter Player Name To Search"
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <SearchIcon onClick={() => findPlayer(playerName)} />
      </div>
      <div className="results">
        {loading ? (
          <p>loading</p>
        ) : players && players.length === 0 ? (
          <p>No Player Found</p>
        ) : (
          players &&
          players.map((player, index) => {
            return <PlayerCard player={player} key={index} add={true} />
          })
        )}
      </div>
    </div>
  )
}

export { MyTeamTab, ManageTeamTab, AddPlayerTab }
