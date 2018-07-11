import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'

import {handleInitialData} from '../actions/shared'
import ListPoles from './ListPoles'
import PoleVoting from './PoleVoting'
import PoleSubmission from './PoleSubmission'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Nav from './Nav'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className="container">

                        <Nav/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={ListPoles}/>
                                <Route path='/pole/:id' component={PoleVoting}/>
                                <Route path='/add' component={PoleSubmission}/>
                                <Route path='/leaderboard' component={Leaderboard}/>

                            </div>
                                }
                    </div>
                </Fragment>
            </Router>
        );
    }
}

export default connect()(App);
