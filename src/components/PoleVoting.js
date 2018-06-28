import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion, formatDate} from "../utils/helpers";

class PoleVoting extends Component {

    render() {
        const { question } = this.props
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {authorName, avatar, timestamp, id,optionOneText, optionTwoText, optionOneVotes, optionTwoVotes} = question

        return (
            <div className='center'>
                <h1>WOULD YOU RATHER</h1>
                <img
                    src={avatar}
                    alt={`Avatar of ${authorName}`}
                    className='bigAvatar'
                />
                <div>
                    <button className="pole-vote-option-button">Vote</button>
                    <h2 className="pole-vote-option">{optionOneText}</h2>
                </div>
                <div>
                    <button className="pole-vote-option-button">Vote</button>
                    <h2 className="pole-vote-option">{optionTwoText}</h2>
                </div>


            </div>
        )
    }
}

//TODO: add id to mapStateToProps
function mapStateToProps ({authedUser, users, questions}) {
    const question = questions["am8ehyc8byjqgar0jgpub9"]
    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect (mapStateToProps)(PoleVoting)