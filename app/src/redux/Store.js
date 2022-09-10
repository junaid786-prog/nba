import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  AddPlayers,
  GetMyTeam,
  LoginUser,
  RegisterNewUser,
  UserProfile,
} from "./reducers"

const middelWare = [thunk]
const RootReducer = combineReducers({
  registeredUser: RegisterNewUser,
  loggedinUser: LoginUser,
  userProfile: UserProfile,

  myTeam: GetMyTeam,
  addPlayer: AddPlayers,
})
const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middelWare))
)
export default Store
