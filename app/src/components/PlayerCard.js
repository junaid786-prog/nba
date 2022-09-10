import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { AddPlayerAction, DeletePlayerAction } from "../redux/actions"

const PlayerCard = ({ player, add = false, remove = false }) => {
  const dispatch = useDispatch()
  const addPlayer = (data) => {
    dispatch(AddPlayerAction(data))
  }
  const deletePlayer = (id) => {
    dispatch(DeletePlayerAction(id))
    window.location.reload()
  }

  return (
    <Link to={`/player/${player.id}`}>
      <div
        className={add || remove ? "player_card" : "player_card player_card_"}
        // onClick={() => navigate(`/player/${player.id}`)}
      >
        <p>{player.id}</p>

        <p>{player.firstname + "  " + player.lastname}</p>
        <p>{player.birth.country}</p>
        {add && (
          <button onClick={() => addPlayer(player)} className="success">
            add
          </button>
        )}
        {remove && (
          <button onClick={() => deletePlayer(player._id)} className="red">
            delete
          </button>
        )}
      </div>
    </Link>
  )
}

export default PlayerCard
