import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion, formatDate} from "../utils/helpers";

class PoleSummary extends Component {

    render() {
        const { question } = this.props

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }
        const {authorName, avatar, timestamp, id,optionOneText, optionTwoText, optionOneVotes, optionTwoVotes} = question
        return (
            <div className='pole-summary'>
                <img
                    src={avatar}
                    alt={`Avatar of ${authorName}`}
                    className='avatar'
                />
                <div className='pole-info'>
                    <div>
                        <span>{authorName}</span>
                        <div>{formatDate(timestamp)}</div>
                    </div>
                    <div>
                        <span>{optionOneText}: {optionOneVotes}</span>
                    </div>
                    <div>
                        <span>{optionTwoText}: {optionTwoVotes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect (mapStateToProps)(PoleSummary)