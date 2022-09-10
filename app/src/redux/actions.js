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
import axios from "axios"

const config = {
  headers: { "content-Type": "application/json" },
  withCredentials: true,
}

const BASE_URL = "http://localhost:8000/api/"

export const registerUserAction = (signupData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const res = await axios.post(BASE_URL + "user/register", signupData, config)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response.data.message })
  }
}

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST })
  try {
    const res = await axios.post(BASE_URL + "user/login", loginData, config)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message })
  }
}

export const userProfileAction = async (dispatch) => {
  dispatch({ type: USER_PROFILE_REQUEST })
  try {
    const res = await axios.get(BASE_URL + "user/me/dashboard", config)
    dispatch({ type: USER_PROFILE_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_PROFILE_FAIL, payload: err.response.data.message })
  }
}

export const logoutUserAction = async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST })
    const res = await axios.get(BASE_URL + "user/logout", config)
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: res.data.user })
  } catch (err) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: err.response.data.message })
  }
}

export const GetMyTeamAction = async (dispatch) => {
  try {
    dispatch({ type: GET_MY_TEAM_PLAYERS_REQUEST })
    let res = await axios.get(BASE_URL + "players/all", config)
    dispatch({ type: GET_MY_TEAM_PLAYERS_SUCCESS, payload: res.data.myPlayers })
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_MY_TEAM_PLAYERS_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const AddPlayerAction = (playerData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PLAYER_REQUEST })
    let res = await axios.post(BASE_URL + "player/add", playerData, config)
    dispatch({ type: ADD_PLAYER_SUCCESS, payload: res.data.message })
  } catch (err) {
    dispatch({
      type: ADD_PLAYER_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const DeletePlayerAction = (playerId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PLAYER_REQUEST })
    let res = await axios.delete(BASE_URL + `player/delete/${playerId}`, config)
    console.log(res)
    dispatch({ type: DELETE_PLAYER_SUCCESS, payload: res.data.player })
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: DELETE_PLAYER_FAIL,
      payload: err.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
