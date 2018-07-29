//src/components/CreateGameButton.js
//redux and program logic in here
import React, {PureComponent} from 'react'

//redux imports
import {connect} from 'react-redux'
import { createGame } from '../actions/games'
import {startNewGame} from '../actions/gamestatus'
//router imports
// import {Link} from 'react-router-dom'

//material.ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//material.ui styles
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },  
});
  
class CreateGameButton extends PureComponent {

  createGameAction = () => {
    let arr = []
    const size=6
    for(let i=0;i < size;i++)
      for(let j=0;j < size;j++)
        arr.push([i,j])
    arr.sort((a,b) => (0.5 - Math.random()))
    arr.sort((a,b) => (0.5 - Math.random()))
    const newLocked = []
    for(let i=0;i<size;i++)newLocked.push(arr.pop())
    const newBoard=[[0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]] 
    newLocked.map(c => newBoard[c[0]][c[1]] = 1 + Math.floor(Math.random()*2))

    this.props.createGame({gamedata: {
         board: newBoard,
         locked: newLocked
       }})
     this.props.startNewGame()  
    // this.props.history.push(`/adverts/${advertId}/addbid`)
  }

  render() {
    //matrial.ui
    const { classes } = this.props;
    //redux
    // const {game} = this.props //mind the case of games
 
    return (
        <Button variant="contained" color="primary" className={classes.button} onClick={this.createGameAction}>
            <Typography> Create New Game </Typography>
        </Button>
    )
  }
}

//material.ui
CreateGameButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

//redux
const mapStateToProps = function (state) {
  return {
    games: state.games,
    gamestatus: state.gamestatus
  }
}

//redux and material.ui cobined export
export default withStyles(styles)(connect(mapStateToProps,
    {  createGame, startNewGame }
)(CreateGameButton))
