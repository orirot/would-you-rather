import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'

import {isAuthenticated} from "../utils/helpers";

class PrivateRoute extends Component {
    render() {
        const {Comp, path, authedUser, location} = this.props
        const isAuth = isAuthenticated(authedUser)

        if (isAuth){
            return <Route path ={path} component={Comp}/>
        } else {
            const to = {
                pathname: '/login',
                search: `?next=${encodeURIComponent(location.pathname)}`
            }
            return <Redirect to={to} />
        }
    }
}

function mapStateToProps({authedUser}, {component: Comp, path}) {
    return {
        authedUser,
        Comp,
        path
    }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
