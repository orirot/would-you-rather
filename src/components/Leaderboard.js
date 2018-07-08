import React, {Component} from 'react'
import { connect } from 'react-redux'
import LeaderboardSingleUser  from './LeaderboardSingleUser'
// import {size} from 'lodash/size';
var _ = require ('lodash')



class Leaderboard extends Component {

    sortUsersArray = (usersArray) => {
        if(usersArray.length>1) {
            usersArray.sort((a, b) => (_.size(usersArray[a].answers) + usersArray[a].questions.length
                - _.size(usersArray[b].answers) - usersArray[b].questions.length))
        }
    }

    render() {
        const usersArray = Object.values(this.props.users)

        this.sortUsersArray(usersArray)

        return (
            <div>
                {usersArray.length > 0 && (
                    <ul>
                        {usersArray.map((u)=>(
                            <li key={u.id}>
                                <LeaderboardSingleUser userId={u.id} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)