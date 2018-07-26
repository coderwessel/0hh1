// src/reducers/game.js

import {FETCH_GAME} from '../actions/game'
import {UPDATE_GAME} from '../actions/game'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case FETCH_GAME:
    return action.payload.game
    
  case UPDATE_GAME:
    return action.payload.game  
  // return [...state].filter((item)=>!(item.id===action.payload.id)).push(action.payload)
  default:
    return state
  }
}

const initialState = []
export default reducer
