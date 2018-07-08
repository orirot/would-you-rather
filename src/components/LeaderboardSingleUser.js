import React, {Component} from 'react'
import { connect } from 'react-redux'
import size from 'lodash/size';

class LeaderboardSingleUser extends Component {

    render() {

        const {user} = this.props
        const {avatarURL, name} = user
        return (
                <div className='pole-summary'>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='pole-info'>
                        <div>
                            <span>{name}</span>
                        </div>
                        <div>
                            <div>Answered {size(user.answers)} questions</div>
                            <div>Asked {user.questions.length} questions</div>
                        </div>
                    </div>
                </div>

                )
    }
}

function mapStateToProps ({users}, {userId}) {
    const user = users[userId]
    return {
        user
    }
}

export default connect(mapStateToProps)(LeaderboardSingleUser)