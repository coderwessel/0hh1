//actions/games.js
import {fetchGame} from './game'
import * as request from 'superagent'
import {baseUrl} from '../db'

export const FETCHED_ALL_GAMES = 'FETCHED_ALL_GAMES'
export const ADD_GAME = 'ADD_GAME'

export function fetchAllGames() {
  return function (dispatch){
    request
      .get(`${baseUrl}/games/`)
      .then(response => dispatch({
        type: FETCHED_ALL_GAMES,
        payload: response.body
      }))
      .catch(err => alert(err))
  }
}

export function createGame(game) {
  return function (dispatch){
    request
      .post(`${baseUrl}/games/`)
      .send(game)
      .then(response => {dispatch({
        type: ADD_GAME,
        payload: response.body
        })
        dispatch(fetchGame(response.body.id))   
      })
      .catch(err => alert(err))
  }
}
