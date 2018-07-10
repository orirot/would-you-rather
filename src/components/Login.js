import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {

    _setAuthedUser = (e)=>{
        debugger
        this.props.dispatch(setAuthedUser(e.valueOf()))
    }

    render() {

        const users = Object.values(this.props.users)

        return (
            <div>
                {console.log(users) || (users && (
                    <form className="login" onSubmit={(event) => this._setAuthedUser(event)}>
                        <div>
                            <select name="users">
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}

                            </select>
                        </div>

                        <div>
                            <button className='btn' type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                ))}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users
    }
}


export default connect(mapStateToProps)(Login)