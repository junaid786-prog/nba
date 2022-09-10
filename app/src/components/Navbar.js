import "../css/home.css"
import navPic from "../assets/nav_2.png"
import accountIcon from "../assets/nav_3.jpg"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { userProfileAction, logoutUserAction } from "../redux/actions"
import { useEffect } from "react"
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(userProfileAction)
  }, [dispatch])
  const { isAuthenticated } = useSelector((state) => state.userProfile)
  return (
    <div className="nav_bar">
      <div className="nav_logo">
        <img src={navPic} alt="nav_logo" onClick={() => navigate("/")} />
      </div>
      <p>NBA-CREATE YOUR TEAM</p>
      <div className="nav_account">
        {!isAuthenticated ? (
          <p onClick={() => navigate("/account")}>Login</p>
        ) : (
          <div className="nav_account_">
            <p
              onClick={() => {
                dispatch(logoutUserAction)
                navigate("/")
                window.location.reload()
              }}
            >
              Log Out
            </p>
            <Link to="/dashboard">
              <img src={accountIcon} alt="nav_logo" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
