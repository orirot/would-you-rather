import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion, didUserVoteToQuestion, didUserVoteToOption} from "../utils/helpers";
import {handleSaveVoteForQuestion} from "../actions/questions";
import PoleSummary from './PoleSummary'

//export const VOTED = 'voted' //TODO

class PoleVotingOption extends Component {

    dispatchHandleSaveVoteForQuestion = () => {
        this.props.dispatch (handleSaveVoteForQuestion(
            this.props.question,
            this.props.optionName,
            this.props.authedUser))
    }

    render() {
        const { question, formattedQuestion, optionName, authedUser, didUserAnswer, didUserPressVote } = this.props
        if (!question) {
            return <p>This Question doesn't exist</p>
        }

        const {authorName, avatar, timestamp, id,optionOneText, optionTwoText, optionOneVotes, optionTwoVotes} = formattedQuestion

        const option = question[optionName]
        return (

            <div className='center'>
                <div>
                    {(!didUserPressVote && !didUserAnswer) && (
                    <button className="pole-vote-option-button"
                            onClick={() =>this.dispatchHandleSaveVoteForQuestion()}>Vote</button>
                    )}
                    {didUserVoteToOption(authedUser, question[optionName]) && (
                        <div>You voted for: </div>
                    )}
                    <h2 className="pole-vote-option">{option.text}</h2>
                    {didUserAnswer && (
                        <div><PoleSummary id={question.id} wasAnsweredByUser={didUserAnswer}/></div>
                    )}
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