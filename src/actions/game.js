//actions/games.js
import * as request from 'superagent'

import {baseUrl} from '../db'

export const FETCH_GAME = 'FETCH_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'

export function fetchGame(gameId) {
  return function (dispatch){
    request
      .get(`${baseUrl}/games/${gameId}`)
      .then(response => dispatch({
        type: FETCH_GAME,
        payload: response.body
      }))
      .catch(err => alert(err))
  }
}

export function updateGame(game, gameId) {
  return function (dispatch){
    
    request
      .put(`${baseUrl}/games/${gameId}`)
      .send(game)
      .then(response => dispatch({
        type: UPDATE_GAME,
        payload: response.body
      }))
      .catch(err => alert(err))
  }
}
