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
      border: '4px solid'
    },
    fill0: {
      backgroundColor: 'white'
    },
    fill1: {
      backgroundColor: 'blue'
    },
    fill2: {
      backgroundColor: 'red'
    }
  });
  
class GameContainer extends PureComponent {
  componentDidMount() {
  this.props.fetchGame(this.props.match.params.id)
    }
    componentWillMount() {
    this.props.fetchGame(this.props.match.params.id)
      }

    doSomethingWithGame = (r,c) => {
       alert(`here I would maybe update ${r},${c} in game ${this.props.match.params.id}`)
    }

  render() {
    //matrial.ui
    const { classes } = this.props;
    //redux
    const {game} = this.props //mind the case of games
 
    return (
        <div>
            <Typography> Game {game.id && game.id} {!game.id && 'loading'}</Typography>
            {game.id && 
              <div>
                {game.gamedata.board.map((row, rowIndex) => 
                  <div 
                    key={rowIndex} 
                    className={classes.row}> 
                      {row.map( (cell,cellIndex) => {
                        let squarefill='fuckyou'
                        if (cell===0) {squarefill=`${classes.fill0}`}
                        if (cell===1) {squarefill=`${classes.fill1}`}
                        if (cell===2) {squarefill=`${classes.fill2}`}
                        return (<div 
                          key={cellIndex}
                          className={`${classes.square} ${squarefill}`} 
                          onClick={this.doSomethingWithGame.bind(null,rowIndex,cellIndex)}>{rowIndex},{cellIndex}</div>)
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
