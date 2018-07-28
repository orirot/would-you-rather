import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signOut} from "../actions/authedUser";


class Signout extends Component {

    signout = () => {
        this.props.dispatch(signOut())
    }

    getUserFullName = () => {
        const _user = this.props.users[this.props.authedUser]
        return _user.name
}

    render() {
        return (
            <div>
                <span>Hi {this.getUserFullName()}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => this.signout()}>signout</button>
            </div>
        )
    }
}

function mapStateToProps ({users, authedUser}, {optionName, question}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Signout);
