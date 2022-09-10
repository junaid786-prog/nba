import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  GET_MY_TEAM_PLAYERS_FAIL,
  GET_MY_TEAM_PLAYERS_REQUEST,
  GET_MY_TEAM_PLAYERS_SUCCESS,
  ADD_PLAYER_REQUEST,
  ADD_PLAYER_SUCCESS,
  ADD_PLAYER_FAIL,
  DELETE_PLAYER_REQUEST,
  DELETE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAIL,
  CLEAR_ERRORS,
} from "./constants"

export const RegisterNewUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: {},
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return { ...state }
  }
}

export const LoginUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        message: action.payload.message,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: {},
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return { ...state }
  }
}
export const LogoutUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: action.payload,
      }
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        message: action.payload,
        user: {},
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return { ...state }
  }
}
export const UserProfile = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
      }
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        message: action.payload,
        user: {},
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return { ...state }
  }
}

export const GetMyTeam = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_TEAM_PLAYERS_REQUEST:
      return {
        loading: true,
        team: {},
      }
    case GET_MY_TEAM_PLAYERS_SUCCESS:
      return {
        loading: false,
        team: action.payload,
      }

    case GET_MY_TEAM_PLAYERS_FAIL:
      return {
        loading: false,
        team: {},
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return { ...state }
  }
}

export const AddPlayers = (state = {}, action) => {
  switch (action.type) {
    case ADD_PLAYER_REQUEST:
      return {
        loading: true,
        team: {},
      }
    case ADD_PLAYER_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      }

    case ADD_PLAYER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return { ...state }
  }
}

export const DeletePlayer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PLAYER_REQUEST:
      return {
        loading: true,
        team: {},
      }
    case DELETE_PLAYER_SUCCESS:
      return {
        loading: false,
        player: action.payload,
      }

    case DELETE_PLAYER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return { ...state }
  }
}
