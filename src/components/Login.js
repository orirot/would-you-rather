import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";
import {withRouter} from 'react-router-dom'
import qs from 'query-string'

class Login extends Component {

    state = {
        user: 'default'
    }

    componentDidUpdate(prevProps) {
        if (prevProps.authedUser === null &&this.props.authedUser !== prevProps.authedUser) {
            this.redirectIfAuthed()
        }
    }

    handleChange(event) {
        this.setState({
            user: event.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        const _user = this.state.user
        this.setState({
            user: ''
        })
        this.props.dispatch(setAuthedUser(_user))
    }

    redirectIfAuthed = () => {
        const { location, history } = this.props
        const query = qs.parse(location.search)
        history.push(query.next || '/')
    }

    render() {
        const users = Object.values(this.props.users)
        const { user } = this.state

        return (
            <div>
                {(users && (
                    <form className="login" onSubmit={(e) => this.handleSubmit(e)}>
                        <div>
                            <select value={user} required name="users" onChange={(event) => this.handleChange(event)}>
                                <option value='default' disabled> -- select an option -- </option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id} >{u.name}</option>
                                ))}

                            </select>
                        </div>
                        <div>
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

export default withRouter(connect(mapStateToProps)(Login))