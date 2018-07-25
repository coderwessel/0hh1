// src/reducers/games.js

import {FETCHED_ALL_GAMES} from '../actions/games'
import {ADD_GAME} from '../actions/games'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case FETCHED_ALL_GAMES:
    return action.payload.games
  case ADD_GAME:
    return [...state].push(action.payload)
  default:
    return state
  }
}

const initialState = []
export default reducer
