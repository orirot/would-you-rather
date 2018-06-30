import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion} from "../utils/helpers";
import PoleVotingOption from './PoleVotingOption'
//export const VOTED = 'voted' //TODO

class PoleVoting extends Component {

    render() {
        const { formattedQuestion } = this.props
        if (!formattedQuestion) {
            return <p>This Question doesn't exist</p>
        }

        const { authorName, avatar } = formattedQuestion


        return (
            <div className='center'>
                <h1>WOULD YOU RATHER</h1>
                <img
                    src={avatar}
                    alt={`Avatar of ${authorName}`}
                    className='bigAvatar'
                />
                <div>
                    <PoleVotingOption optionName="optionOne" question={this.props.question}/>
                    <PoleVotingOption optionName="optionTwo" question={this.props.question}/>
                </div>
            </div>
        )
    }
}

//TODO: add question id to mapStateToProps
function mapStateToProps ({authedUser, users, questions}) {
    const question = questions["am8ehyc8byjqgar0jgpub9"]

    return {
        authedUser,
        question,
        formattedQuestion: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
    }
}

export default connect (mapStateToProps)(PoleVoting)