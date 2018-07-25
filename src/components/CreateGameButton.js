//src/components/CreateGameButton.js
//redux and program logic in here
import React, {PureComponent} from 'react'

//redux imports
import {connect} from 'react-redux'
import { createGame } from '../actions/games'
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
       this.props.createGame({gamedata: {
         board: [[0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0]]
       }})
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
    games: state.games
  }
}

//redux and material.ui cobined export
export default withStyles(styles)(connect(mapStateToProps,
    {  createGame }
)(CreateGameButton))
