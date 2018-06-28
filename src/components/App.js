import React, { Component } from 'react';
import { connect } from 'react-redux'

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
        <ListPoles/>
        <PoleVoting/>
      </div>
    );
  }
}

export default connect()(App);
