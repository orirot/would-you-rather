import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion, didUserVoteToQuestion} from "../utils/helpers";
import PoleVotingOption from './PoleVotingOption'
import PoleSummary from './PoleSummary'
//export const VOTED = 'voted' //TODO

class PoleVoting extends Component {

    render() {
        const {formattedQuestion, question, authedUser} = this.props
        if (!formattedQuestion) {
            return <p>This Question doesn't exist</p>
        }

        const {authorName, avatar} = formattedQuestion
        const _didUserVoteToQuestion = didUserVoteToQuestion(authedUser, question)

        return (
            <div className='center'>
                {!_didUserVoteToQuestion &&(
                <div>
                    <h1>WOULD YOU RATHER</h1>
                    <img
                        src={avatar}
                        alt={`Avatar of ${authorName}`}
                        className='bigAvatar'
                    />
                    <div>
                        <PoleVotingOption optionName="optionOne" question={question}/>
                        <PoleVotingOption optionName="optionTwo" question={question}/>
                    </div>
                </div>)}
                {_didUserVoteToQuestion &&(
                    <div>
                        <PoleSummary id={question.id} wasAnsweredByUser={true}/>
                    </div>
                )}
            </div>
        )
    }
}

//TODO: add question id to mapStateToProps
function mapStateToProps({authedUser, users, questions}) {
    const question = questions["am8ehyc8byjqgar0jgpub9"]

    return {
        authedUser,
        question,
        formattedQuestion: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
    }
}

export default connect(mapStateToProps)(PoleVoting)