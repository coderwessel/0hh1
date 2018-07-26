import React, { Component } from 'react';
import GamesContainer from './components/GamesContainer'
import GameContainer from './components/GameContainer'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    flexGrow: 1,
  },
};


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header><Typography class="title">0hh1 demo by wessel</Typography></header>
          <Route exact path="/games" component={GamesContainer} />
          <Route exact path="/games/:id" component={GameContainer} />
          <Route exact path="/" render={ () => <Redirect to="/games" /> } />
        </div>
      </Router>
    )
  }
}

export default App;