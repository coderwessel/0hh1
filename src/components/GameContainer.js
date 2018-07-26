//src/components/GameContainer.js
//redux and program logic in here
import React, {PureComponent} from 'react'

//redux imports
import {connect} from 'react-redux'
import { fetchGame, updateGame } from '../actions/game'
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
      display: 'flex',
      flexflow: 'row' ,
      flexdirection: 'row',
      flexwrap: 'wrap',
      
    },
    square:{
      position: 'relative',
      display: 'flex',
      minHeight: 75,
      minWidth: 75,
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
      backgroundColor: 'DarkBlue'  
    },
    lockedfill2:{
      backgroundColor: 'FireBrick'
    }
  });
  
class GameContainer extends PureComponent {
  componentDidMount() {
  this.props.fetchGame(this.props.match.params.id)
    }
  componentWillMount() {
    this.props.fetchGame(this.props.match.params.id)
    }

  doMove = (r,c) => {
      //alert(`here I would maybe update ${r},${c} in game ${this.props.match.params.id}`)
      if (this.props.game.gamedata.locked.some( (a) => a[0]===r && a[1]===c ))return

      const newboard = [...this.props.game.gamedata.board]
      const newlocked = [...this.props.game.gamedata.locked]
      newboard[r][c]+=1
      if (newboard[r][c]===3) newboard[r][c]=0
      this.props.updateGame({gamedata: 
          { board: newboard, 
            locked: newlocked
    }},this.props.match.params.id)
  }

  resetBoard = () => {
    let newboard = [...this.props.game.gamedata.board]
    const newlocked = [...this.props.game.gamedata.locked]
    for(let r=0;r<=5;r++){
      for(let c=0;c<=5;c++){ 
        if (!this.props.game.gamedata.locked.some( (a) => a[0]===r && a[1]===c ))newboard[r][c]=0
      }
    }
    this.props.updateGame({gamedata: 
          { board: newboard, 
            locked: newlocked
    }},this.props.match.params.id)
  }

  render() {
    //matrial.ui
    const { classes } = this.props;
    //redux
    const {game} = this.props //mind the case of games
    let validRows=[
      [true,true,true,true,true,true],
      [true,true,true,true,true,true],
      [true,true,true,true,true,true]]
    let validCols=[
      [true,true,true,true,true,true],
      [true,true,true,true,true,true],
      [true,true,true,true,true,true]]
    
    if(game.id){
      for(let color=1;color<=2;color++){
        for(let row=0;row<=5;row++){
          validRows[color][row] = game.gamedata.board[row].filter(val=>val===color).length < 4    
        }
      }
      //tranpose the board to check for invalid columns
      const transboard = game.gamedata.board[0].map((col1, i) => game.gamedata.board.map(row1 => row1[i]));
      console.log(transboard)
      for(let color=1;color<=2;color++){
        for(let col=0;col<=5;col++){
          validCols[color][col] = transboard[col].filter(val=>val===color).length < 4    
        }
      } 
    }
    // console.log(game.gamedata.board)
    console.log(validRows[1])
    return (
        <div>
            <Typography> Game {game.id && game.id} {!game.id && 'loading'}</Typography>
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
                        let squarefill='fuckyou'
                        if (cell===0) {squarefill=`${classes.fill0}`}
                        if (cell===1) {squarefill=`${classes.fill1}`}
                        if (cell===2) {squarefill=`${classes.fill2}`}
                        if (cell===1 && game.gamedata.locked.some((a)=>a[0]===rowIndex&&a[1]===cellIndex)) {squarefill=`${classes.lockedfill1}`}
                        if (cell===2 && game.gamedata.locked.some((a)=>a[0]===rowIndex&&a[1]===cellIndex)) {squarefill=`${classes.lockedfill2}`}
                        if (validRows[cell][rowIndex] && validCols[cell][cellIndex]) border=`${classes.validborder}`
                        return (<div 
                          key={cellIndex}
                          className={`${classes.square} ${border} ${squarefill}`} 
                          onClick={this.doMove.bind(null,rowIndex,cellIndex)}></div>)
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
    game: state.game
  }
}

//redux and material.ui cobined export
export default withStyles(styles)(connect(mapStateToProps,
    {  fetchGame, updateGame }
)(GameContainer))
