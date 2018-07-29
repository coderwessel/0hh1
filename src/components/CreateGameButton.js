//src/components/CreateGameButton.js
//redux and program logic in here
import React, {PureComponent} from 'react'

//redux imports
import {connect} from 'react-redux'
import { createGame } from '../actions/games'
import {startNewGame} from '../actions/gamestatus'

//material.ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import RowColGame from '../misc/RowColGame'

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
    let rcg = new RowColGame()
    let newGame=rcg.createGame(6,6,3,9)
    this.props.createGame({gamedata: newGame})
     this.props.startNewGame()  
  }

  render() {
    //matrial.ui
    const { classes } = this.props;
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
