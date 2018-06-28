import React, { Component } from 'react';
import { connect } from 'react-redux'
import PoleSummary from "./PoleSummary";

class ListPoles extends Component{
    render(){
        return (
            <div>
                <h3 className="center">Not Answered Poles</h3>
                <ul>
                    {this.props.notAnsweredQuestions.map((q)=>(
                        <li key={q.id}>
                            <PoleSummary id={q.id}/>
                        </li>
                    ))}
                </ul>

                <h3 className="center">Answered Poles</h3>
                <ul>
                    {this.props.answeredQuestions.map((q)=>(
                        <li key={q.id}>
                            <PoleSummary id={q.id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function didUserVoteToQuestion (userId, question){
    return (didUserVoteToOption(userId, question.optionOne)
    || didUserVoteToOption(userId, question.optionTwo))
}

function didUserVoteToOption (userId, option){
    const votes = option.votes
    if (votes.includes(userId)){
        return true;
    }
    return false;
}

function mapStaeToProps({authedUser, questions}){
    const questionsArray = Object.values(questions)
    const answeredQuestions = questionsArray.filter((q) => ((didUserVoteToQuestion(authedUser, q))))
    const notAnsweredQuestions = questionsArray.filter((q) => (!(didUserVoteToQuestion(authedUser, q))))
    return {
        notAnsweredQuestions: notAnsweredQuestions
            .sort((a,b) => b.timestamp - a.timestamp),
        answeredQuestions: answeredQuestions
            .sort((a,b) => b.timestamp - a.timestamp)
    }
}

export default connect(mapStaeToProps)(ListPoles)