import React, { Component } from 'react';
import { connect } from 'react-redux'

import { handleInitialData } from '../actions/shared'
import ListPoles from './ListPoles'

class App extends Component {

  componentDidMount(){
      this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <ListPoles/>
      </div>
    );
  }
}

export default connect()(App);
