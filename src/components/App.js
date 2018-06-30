import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import ListPoles from './ListPoles'
import PoleVoting from './PoleVoting'

class App extends Component {

  componentDidMount(){
      this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
          <LoadingBar />
        <ListPoles/>
        <PoleVoting/>
      </div>
    );
  }
}

export default connect()(App);
