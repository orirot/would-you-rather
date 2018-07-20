import React, {Component} from 'react'
import { connect } from 'react-redux'
import LeaderboardSingleUser  from './LeaderboardSingleUser'
import {Redirect} from 'react-router-dom'

import { isAuthenticated } from "../utils/helpers";

var _ = require ('lodash')

class Leaderboard extends Component {

    sortByTotalQA = (a,b) =>{
        return _.size(b.answers) + _.size(b.questions) - _.size(a.answers) - _.size(a.questions);
    }

    sortUsersArray = (usersArray) => {
        if(usersArray.length>1) {
            usersArray.sort((a, b) => this.sortByTotalQA(a,b))
        }
    }

    render() {

        const usersArray = Object.values(this.props.users)

        this.sortUsersArray(usersArray)

        return (
            <div>

                {!isAuthenticated(this.props.authedUser) ? (<Redirect
                        to={{
                            pathname: "/login"
                        }}
                    />):(

                usersArray.length > 0 && (
                    <ul>
                        {usersArray.map((u)=>(
                            <li key={u.id}>
                                <LeaderboardSingleUser userId={u.id} />
                            </li>
                        ))}
                    </ul>
                )
                    )}
            </div>
        )
    }
}

function mapStateToProps ({users, authedUser}) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)