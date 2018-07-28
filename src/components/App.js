import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'

import {handleInitialData} from '../actions/shared'
import ListPoles from './ListPoles'
import PoleVoting from './PoleVoting'
import PoleSubmission from './PoleSubmission'
import Leaderboard from './Leaderboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Signout from './Signout'
import Nav from './Nav'
import NotFound from './NotFound'
import {isAuthenticated} from "../utils/helpers";

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
                            :
                            <Fragment>
                                {isAuthenticated(this.props.authedUser) && (<Signout/>)}
                                <Switch>
                                    <Route path='/login' component={Login}/>
                                    <PrivateRoute path='/' exact component={ListPoles}/>
                                    <PrivateRoute path='/questions/:id' component={PoleVoting}/>
                                    <PrivateRoute path='/add' component={PoleSubmission}/>
                                    <PrivateRoute path='/leaderboard' component={Leaderboard}/>
                                    <PrivateRoute component={NotFound}/>
                                </Switch>
                            </Fragment>}
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}


export default connect(mapStateToProps)(App);
