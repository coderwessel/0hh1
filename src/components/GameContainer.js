//src/components/GameContainer.js
//redux and program logic in here
import React, {PureComponent} from 'react'

//redux imports
import {connect} from 'react-redux'
import { fetchGame, updateGame } from '../actions/game'
import { updateGameLogic} from '../actions/gamelogic'
import { startNewGame, playingGame, finishGame} from '../actions/gamestatus'
//router imports
import {Link} from 'react-router-dom'

//material.ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'
import CreateGameButton from './CreateGameButton';
import Button from '@material-ui/core/Button'
import GameDialog from './GameDialog'
import Lock from '@material-ui/icons/Lock'
import RowColGame from '../misc/RowColGame'

//material.ui styles
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row:{
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexflow: 'row' ,
      flexdirection: 'row',
      flexwrap: 'wrap',
      
    },
    square:{
      position: 'relative',
      display: 'flex',
      minHeight: 40,
      minWidth: 40,
      maxHeight: 75,
      maxWidth: 75,
    },
    validborder:{
      border: '4px solid'
    },
    invalidborder:{
      border: '4px solid yellow'
    },
    fill0: {
      backgroundColor: 'white'
    },
    fill1: {
      backgroundColor: 'blue'
    },
    fill2: {
      backgroundColor: 'red'
    },
    lockedfill1: {
      backgroundColor: 'DarkBlue',
    },
    lockedfill2:{
      backgroundColor: 'FireBrick'
    }
  });
  
class GameContainer extends PureComponent {
  componentDidMount() {
  
    this.props.fetchGame(this.props.match.params.id)
    if(this.props.game.id){
      const newGameLogic = RowColGame.calculateGameLogic(this.props.game.gamedata) 
      this.props.updateGameLogic({gamelogic:newGameLogic})
    }
  }
//  if(this.props.gamelogic.complete===100 && this.props.gamelogic.numErrors===0) this.props.finishGame()
  
  // componentWillMount() {
  //   this.props.fetchGame(this.props.match.params.id)
  //   if(this.props.game.id){
  //     const newGameLogic = RowColGame.calculateGameLogic(this.props.game.gamedata) 
  //     this.props.updateGameLogic({gamelogic:newGameLogic})
  //   }
  // }

  doMove = (r,c) => {
      this.props.playingGame()

      const newGameData = RowColGame.doMove(this.props.game.gamedata,r,c)
      this.props.updateGame({gamedata: newGameData},this.props.match.params.id)
      const newGameLogic = RowColGame.calculateGameLogic(newGameData) 
      this.props.updateGameLogic(newGameLogic)
      if(newGameLogic.complete===100 && newGameLogic.numErrors===0) this.props.finishGame()
    }

  resetBoard = () => {
    startNewGame()
    const newGameData = RowColGame.resetBoard(this.props.game.gamedata)
    this.props.updateGame({gamedata: newGameData},this.props.match.params.id)
 
    const newGameLogic = RowColGame.calculateGameLogic(newGameData) 
    this.props.updateGameLogic(newGameLogic)
    if(newGameLogic.complete===100 && newGameLogic.numErrors===0) this.props.finishGame()
  }

  handleGameDialogClose = () => {
    this.props.playingGame()
  }

  render() {
    //matrial.ui
    const { classes } = this.props;
    //redux
    const {game, gamelogic, gamestatus} = this.props //mind the case of games
    if (game.id && game.id != this.props.match.params.id) this.props.history.push(`/games/${game.id}`)        
    return (
        <div>
            <GameDialog
              open={gamestatus.finishgame}
              onClose={this.handleGameDialogClose}
            />
            <Typography> Game {game.id && game.id} {!game.id && 'loading'} {game.id && gamelogic.complete }%</Typography>
            <CreateGameButton/> 
            {game.id && <Button variant="contained" 
                          color="secondary" className={classes.button}
                          onClick={this.resetBoard}>Reset Game</Button>}
            {game.id && 
              <div>
                { 
                  game.gamedata.board.map((row, rowIndex) => 
                  <div 
                    key={rowIndex} 
                    className={classes.row}> 
                      {row.map( (cell,cellIndex) => {
                        let border=`${classes.invalidborder}`
                        let squarefill='undefined'
                        if (cell===0) {squarefill=`${classes.fill0}`}
                        if (cell===1) {squarefill=`${classes.fill1}`}
                        if (cell===2) {squarefill=`${classes.fill2}`}
                        if (cell===1 && game.gamedata.locked.some((a)=>a[0]===rowIndex&&a[1]===cellIndex)) {squarefill=`${classes.lockedfill1}`}
                        if (cell===2 && game.gamedata.locked.some((a)=>a[0]===rowIndex&&a[1]===cellIndex)) {squarefill=`${classes.lockedfill2}`}
                        if (gamelogic.validRows && gamelogic.validRows[cell][rowIndex] && gamelogic.validCols[cell][cellIndex]) border=`${classes.validborder}`
                        return (<div 
                          key={cellIndex}
                          className={`${classes.square} ${border} ${squarefill}`} 
                          onClick={this.doMove.bind(null,rowIndex,cellIndex)}>
                          {game.gamedata.locked.some(
                            (a)=>a[0]===rowIndex&&a[1]===cellIndex) &&
                            <Lock/>}
                          </div>)
                        }
                      )}
                    </div>
                  )} 
              </div> 
            }
            {/* <p>{game.gamedata}</p> */}
        </div>
    )
  }
}

//material.ui
GameContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

//redux
const mapStateToProps = function (state) {
  return {
    game: state.game,
    gamelogic: state.gamelogic,
    gamestatus: state.gamestatus
  }
}

//redux and material.ui cobined export
export default withStyles(styles)(connect(mapStateToProps,
    {  fetchGame, updateGame, updateGameLogic, playingGame, startNewGame, finishGame }
)(GameContainer))
