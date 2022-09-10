import team from "../assets/create_team.jpg"
import players from "../assets/player_1.jpg"

const offers = [
  {
    key: "create your own team",
    pic: team,
  },
  {
    key: "select players from globe",
    pic: players,
  },
  {
    key: "create your own team",
    pic: team,
  },
]
const Offers = () => {
  return (
    <div className="offers_container">
      <h3>You Can</h3>
      <div className="offers">
        {offers.map((offer, i) => {
          return (
            <div className="offer" key={i}>
              <img src={offer.pic} alt={offer.key} />
              <p>{offer.key}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Offers
