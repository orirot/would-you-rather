import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion, didUserVoteToQuestion} from "../utils/helpers";
import {handleSaveVoteForQuestion} from "../actions/questions";

//export const VOTED = 'voted' //TODO

class PoleVotingOption extends Component {

    addVoteToQuestion= (question, chosenOption) => {
        const _votes = question[chosenOption].votes.concat(this.props.authedUser)
        const _option = { ...(question[chosenOption]), votes:_votes}
        return {
            ...question, [chosenOption]:_option
        }
    }

    handleVote = (option) => {
        const _question = this.addVoteToQuestion(this.props.question, option)
        this.props.dispatch(handleSaveVoteForQuestion({
            question: _question,
            authedUser: this.props.authedUser
        }))
    }


    render() {
        const { question, formattedQuestion, authedUser, didUserAnswer, didUserPressVote } = this.props
        if (!question) {
            return <p>This Question doesn't exist</p>
        }

        const {authorName, avatar, timestamp, id,optionOneText, optionTwoText, optionOneVotes, optionTwoVotes} = formattedQuestion

        const option = question[this.props.optionName]
        return (
            <div className='center'>
                <div>
                    <button className="pole-vote-option-button"
                            disabled={didUserPressVote || didUserAnswer}
                            onClick={() =>this.handleVote(this.props.optionName)}>Vote</button>
                    <h2 className="pole-vote-option">{option.text}</h2>
                </div>
            </div>
        )
    }
}

//TODO: add question id to mapStateToProps
function mapStateToProps ({authedUser, users}, {optionName, question}) {
    return {
        optionName,
        authedUser,
        question,
        formattedQuestion: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
        didUserAnswer: question ? didUserVoteToQuestion(authedUser, question)
            : false,
        didUserPressVote: question ? question.voted : false
    }
}

export default connect (mapStateToProps)(PoleVotingOption)