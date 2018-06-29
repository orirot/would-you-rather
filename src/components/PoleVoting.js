import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion, didUserVoteToQuestion} from "../utils/helpers";
import {handleSaveVoteForQuestion} from "../actions/questions";

//export const VOTED = 'voted' //TODO

class PoleVoting extends Component {

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
        const { question, authedUser, didUserAnswer, didUserPressVote } = this.props
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
                    <button className="pole-vote-option-button"
                            disabled={didUserPressVote || didUserAnswer}
                            onClick={() =>this.handleVote("optionOne")}>Vote</button>
                    <h2 className="pole-vote-option">{optionOneText}</h2>
                </div>
                <div>
                    <button className="pole-vote-option-button"
                            disabled={didUserPressVote || didUserAnswer}
                            onClick={() =>this.handleVote("optionTwo")}>Vote</button>
                    <h2 className="pole-vote-option">{optionTwoText}</h2>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

//TODO: add question id to mapStateToProps
function mapStateToProps ({authedUser, users, questions}) {
    const question = questions["am8ehyc8byjqgar0jgpub9"]
    if (question){
        console.log({users,question})
        console.log(users,"*******users")
        console.log(users[question.author],"*******users[question.author]")}
    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
        didUserAnswer: question ? didUserVoteToQuestion(authedUser, question)
            : false,
        didUserPressVote: question ? question.voted : false
    }
}

export default connect (mapStateToProps)(PoleVoting)