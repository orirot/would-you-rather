import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion, formatDate} from "../utils/helpers";
import { Link } from 'react-router-dom'

class PoleSummary extends Component {

    optionPercentage = (optionName) =>{
        const numThisOptionVoted = this.props.question[optionName].votes.length
        const  totalVotes = this.props.question["optionOne"].votes.length + this.props.question["optionTwo"].votes.length
        return(100*(numThisOptionVoted / totalVotes))
    }

    render() {
        const { formattedQuestion , wasAnsweredByUser} = this.props

        if (formattedQuestion === null) {
            return <p>This Question doesn't exist</p>
        }
        const {id, authorName, avatar, timestamp, optionOneText, optionTwoText, optionOneVotes, optionTwoVotes} = formattedQuestion
        return (
            <Link to={`/pole/${id}`} className='pole-summary'>
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
                        {wasAnsweredByUser && (
                            <div>%{this.optionPercentage("optionOne")}</div>
                        )}
                    </div>
                    <div>
                        <span>{optionTwoText}: {optionTwoVotes}</span>
                        {wasAnsweredByUser && (
                            <div>%{this.optionPercentage("optionTwo")}</div>
                        )}
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id, wasAnsweredByUser }) {
    const question = questions[id]
    return {
        authedUser,
        formattedQuestion: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
        wasAnsweredByUser,
        question
    }
}

export default connect (mapStateToProps)(PoleSummary)