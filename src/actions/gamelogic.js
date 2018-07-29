//actions/gamelogic.js

export const UPDATE_GAMELOGIC = 'UPDATE_GAMELOGIC'

export function updateGameLogic(gamelogic) {
  return function (dispatch){
      dispatch({
        type: UPDATE_GAMELOGIC,
        payload: gamelogic
      })
  }
}
