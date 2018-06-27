import React, { Component } from 'react';
import { connect } from 'react-redux'

import { handleInitialData } from '../actions/shared'
import PoleSummary from './PoleSummary'

class App extends Component {

  componentDidMount(){
      this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <PoleSummary/>
      </div>
    );
  }
}

export default connect()(App);
