import React, {Component} from 'react'
import {connect} from 'react-redux'

import {formatQuestion, didUserVoteToQuestion} from "../utils/helpers";
import PoleVotingOption from './PoleVotingOption'
import PoleSummary from './PoleSummary'

class PoleVoting extends Component {

    render() {
        const {formattedQuestion, question, authedUser} = this.props
        if (!formattedQuestion) {
            return <p>404 This Question doesn't exist</p>
        }

        const {authorName, avatar} = formattedQuestion
        const _didUserVoteToQuestion = didUserVoteToQuestion(authedUser, question)

        return (
            <div>
                <div className='center'>
                    {!_didUserVoteToQuestion && (
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
                    {_didUserVoteToQuestion && (
                        <div>
                            <PoleSummary id={question.id} wasAnsweredByUser={true}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const {id} = props.match.params
    const question = questions[id]
    return {
        authedUser,
        question,
        formattedQuestion: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
    }
}

export default connect(mapStateToProps)(PoleVoting)