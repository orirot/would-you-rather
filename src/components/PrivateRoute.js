import React, {Component, Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'

class PrivateRoute extends Component {



    isAuthenticated = () => {
        if (this.props.authedUser !== null && this.props.authedUser !== undefined) {
            return true
        }
        return false
    }

    render() {
        const {Comp, path} = this.props
        // console.log({authed: this.props.authedUser, componenttt: this.props.Comp})
        const isAuth = this.isAuthenticated()
        console.log({isAuth, Comp})
        if (isAuth){
            return <Route path ={path} component={Comp}/>
        }else{
            return <Route path ={path} component={Login}/>
        }
        return null
/*        return (
            <Route
                {...rest}
                render ={(props)=> (
                    () => this.isAuthenticated() ? (
                        <Comp {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login"
                                // state: { from: props.location }
                            }}
                        />
                    )
                )}
            />
        )*/
    }

}

function mapStateToProps({authedUser}, {component: Comp, path}) {
    return {
        authedUser,
        Comp,
        path
    }
}

export default connect(mapStateToProps)(PrivateRoute)
