// src/reducers/gamelogic.js

import {UPDATE_GAMELOGIC} from '../actions/gamelogic'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    
  case UPDATE_GAMELOGIC:
    return action.payload
  // return [...state].filter((item)=>!(item.id===action.payload.id)).push(action.payload)
  default:
    return state
  }
}

const initialState = []
export default reducer
