import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestion, formatDate, wasOptionVotedByUser} from "../utils/helpers";
import { Link } from 'react-router-dom'
import authedUser from "../reducers/authedUser";

class PoleSummary extends Component {

    optionPercentage = (optionName) =>{
        const numThisOptionVoted = this.props.question[optionName].votes.length
        const  totalVotes = this.props.question["optionOne"].votes.length + this.props.question["optionTwo"].votes.length
        const roundedNum = (100*(numThisOptionVoted / totalVotes)).toFixed(2)
        return roundedNum
    }

    render() {
        const {question, formattedQuestion , wasAnsweredByUser, authedUser} = this.props
        const {id, authorName, avatar, timestamp, optionOneText, optionTwoText, optionOneVotes, optionTwoVotes} = formattedQuestion
        const options = ["optionOne", "optionTwo"]
        return (
            <Link to={`/questions/${id}`} className='pole-summary'>
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
                    {options.map(option => {
                        return  <div className={wasOptionVotedByUser(question,authedUser, option) ? "pole-summary-option":""}>
                            <span>{optionOneText}{wasAnsweredByUser && (`: ` + optionOneVotes)}</span>
                            {wasAnsweredByUser && (
                                <div>%{this.optionPercentage(option)}</div>
                            )}
                        </div>
                    })}
                </div>
            </Link>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id, wasAnsweredByUser }) {
    const question = questions[id]
    console.log({question})
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