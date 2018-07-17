import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";
import {Redirect} from 'react-router-dom'

class Login extends Component {

    state = {
        user: ''
    }

    handleChange(event) {
        this.setState({
            user: event.target.value
        })
    }

    handleSubmit = ()=>{
        const user = this.state.user
        this.setState({
            user: ''
        })
        this.props.dispatch(setAuthedUser(user))
    }

    isAuthenticated = () => {
        if (this.props.authedUser !== null && this.props.authedUser !== undefined) {
            return true
        }
        return false
    }

    render() {

        const users = Object.values(this.props.users)

        return (
            <div>
                {this.isAuthenticated() ? (<Redirect
                    to={{
                        pathname: "/"
                    }}
                />):
                console.log(users) || (users && (
                    <form className="login" onSubmit={() => this.handleSubmit()}>
                        <div>
                            <select name="users" onChange={(event) => this.handleChange(event)}>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id} >{u.name}</option>
                                ))}

                            </select>
                        </div>

                        <div>
{/*                            <button className='btn' type='submit'  onClick={(event) => this._setAuthedUser(event)}>
                                Submit
                            </button>*/}
                            <input className='btn' type='submit'/>
                        </div>
                    </form>
                ))}
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users,
        authedUser
    }
}


export default connect(mapStateToProps)(Login)