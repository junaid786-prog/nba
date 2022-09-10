import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RAPID_API_HOST, RAPID_API_KEY } from "../redux/constants"

const PlayerDetails = () => {
  const [players, setPlayers] = useState()
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const player_id = params.id

  useEffect(() => {
    const findPlayer = () => {
      setLoading(true)
      const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/players",
        params: { id: player_id },
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
        })
        .catch(function (error) {
          setLoading(false)
          setPlayers([])
        })
    }
    findPlayer()
  }, [player_id])

  return (
    <div className="player_details">
      {loading ? (
        <p>Loading</p>
      ) : (
        players &&
        players.map((player) => {
          return (
            <div className="player_details_card">
              <p>
                Player ID: <span>{player.id}</span>
              </p>
              <p>
                First Name: <span>{player.firstname}</span>
              </p>
              <p>
                Last Name: <span>{player.lastname}</span>
              </p>
              <p>
                Date Of Birth: <span>{player.birth.date}</span>
              </p>
              <p>
                Birth Country: <span>{player.birth.country}</span>
              </p>
              <p>
                Player Affiliation: <span>{player.affiliation}</span>
              </p>
              <p>
                NBA:{" "}
                <span>
                  {" "}
                  Start: {player.nba && player.nba.start} PRO:{" "}
                  {player.nba && player.nba.pro}
                </span>
              </p>
              <p>
                Weight:{" "}
                <span>
                  {player.weight.pounds} Pounds and {player.weight.kilograms}{" "}
                  Kilograms{" "}
                </span>
              </p>
            </div>
          )
        })
      )}
    </div>
  )
}

export default PlayerDetails
