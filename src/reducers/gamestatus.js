// src/reducers/game.js

import {START_NEW_GAME} from '../actions/gamestatus'
import {FINISH_GAME} from '../actions/gamestatus'
import {PLAYING_GAME} from '../actions/gamestatus'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case START_NEW_GAME:
    return {...state,
        startnewgame: true, 
        playinggame: false,
        finishgame: false
    }    
  case FINISH_GAME:
  return {...state,
      startnewgame: false, 
      playinggame: false,
      finishgame: true
  }
  case PLAYING_GAME:
  return {...state,
      startnewgame: false, 
      playinggame: true,
      finishgame: false
  }   
  default:
    return state
  }
}

const initialState = []
export default reducer
