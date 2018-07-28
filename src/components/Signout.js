import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signOut} from "../actions/authedUser";


class Signout extends Component {

    signout = () => {
        this.props.dispatch(signOut())
    }

    render() {
        return (
           <button onClick={() => this.signout()}>signout</button>
        )
    }
}

export default connect()(Signout);
