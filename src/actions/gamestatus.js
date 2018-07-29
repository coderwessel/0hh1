//actions/games.js
export const START_NEW_GAME = 'START_NEW_GAME'
export const FINISH_GAME = 'FINISH_GAME'
export const PLAYING_GAME = 'PLAYING_GAME'

export function startNewGame() {
  return function (dispatch){
      dispatch({
        type: START_NEW_GAME,
        payload: {}
      })
  }
}

export function finishGame() {
  return function (dispatch){
      dispatch({
        type: FINISH_GAME,
        payload: {}
      })
  }
}

export function playingGame() {
  return function (dispatch){
      dispatch({
        type: PLAYING_GAME,
        payload: {}
      })
  }
}
