import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, loginUserAction } from "../redux/actions"
import { useAlert } from "react-alert"

const LoginSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  // states
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")

  const userForLogin = { gmail, password }

  const { isAuthenticated, error } = useSelector((state) => state.loggedinUser)

  const loginUser = () => {
    dispatch(loginUserAction(userForLogin))
  }
  useEffect(() => {
    const navigateNow = () => {
      navigate("/")
      window.location.reload()
    }
    if (isAuthenticated) {
      navigateNow()
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [isAuthenticated, navigate, alert, error, dispatch])

  return (
    <div className="login_section">
      <div className="section_heading">
        <h3>Sign in to NBA</h3>
      </div>
      <div className="continue_btns">
        <input
          placeholder="Email / Username"
          className="login_first_input"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login_btn">
        <button className="cursor_ptr" onClick={loginUser}>
          Continue
        </button>
      </div>
      <div className="line">
        <hr />
      </div>
      <div className="joining_section">
        <p className="login_p">
          Not already member?{" "}
          <Link to="/register">
            <span className="c_green cursor_ptr">Join now</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginSection
