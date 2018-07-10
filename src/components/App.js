import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import ListPoles from './ListPoles'
import PoleVoting from './PoleVoting'
import PoleSubmission from './PoleSubmission'
import Leaderboard from './Leaderboard'
import Login from './Login'

class App extends Component {

  componentDidMount(){
      this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
          <Login/>
          <PoleSubmission/>
          <LoadingBar />
        {/*<ListPoles/>*/}
        <Leaderboard/>
        <PoleVoting/>//TODO: disappears after Loading bar
      </div>
    );
  }
}

export default connect()(App);
