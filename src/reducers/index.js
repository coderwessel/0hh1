//reducers/index.js

//  not needed anymore:
// import { combineReducers } from 'redux'
import games from './games'
import game from './game'
import gamelogic from './gamelogic'
import gamestatus from './gamestatus'

export default {games: games,
     gamelogic: gamelogic,
     game: game,
    gamestatus: gamestatus};