//src/components/GamesContainer.js
//redux and program logic in here
import React, {PureComponent} from 'react'

//redux imports
import {connect} from 'react-redux'
import { fetchAllGames } from '../actions/games'
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
  });
  
class GamesContainer extends PureComponent {
  componentDidMount() {
  this.props.fetchAllGames()
    }
    componentWillMount() {
    this.props.fetchAllGames()
      }

    doSomethingWithGame = (gameId) => {
       alert(`here I would maybe update ${gameId}`)
    }

  render() {
    //matrial.ui
    const { classes } = this.props;
    //redux
    const {games} = this.props //mind the case of games
 
    return (
        <div>
            <Typography> All Games </Typography>
            <CreateGameButton/>
            <Table className={classes.table}>
                <TableHead>
                        <TableRow>
                            <TableCell>#Id</TableCell>
                            <TableCell text>Content</TableCell>
                            <TableCell text>Play</TableCell>
                        </TableRow>
                        </TableHead>
                <TableBody>

                { (games.length>=0) && games.map( game => (
                    <TableRow key={game.id}>
                        <TableCell component="th" scope="row">
                        {game.id}
                        </TableCell>
                        <TableCell text>{JSON.stringify(game.gamedata)}</TableCell>
                        <TableCell text><Button 
                            component={Link} 
                            to = {`/games/${game.id}`}
                            variant="contained" 
                            color="primary" 
                            className={classes.button}>Start Game
                            </Button>
                          </TableCell>
                    </TableRow>
                    )) }
                </TableBody>
            </Table>
        </div>
    )
  }
}

//material.ui
GamesContainer.propTypes = {
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
    {  fetchAllGames }
)(GamesContainer))
