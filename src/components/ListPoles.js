import React, { Component } from 'react';
import { connect } from 'react-redux'
import PoleSummary from "./PoleSummary";
import { didUserVoteToQuestion }from '../utils/helpers'
class ListPoles extends Component{

    state = {
        showAnsweredPoles: false
    }

    toggleShowAnswered =() => {
        this.setState({
            showAnsweredPoles: !this.state.showAnsweredPoles
        })
    }

    render(){
        const { showAnsweredPoles } = this.state
        const listToShow = {
            questionsToShow: showAnsweredPoles ? this.props.answeredQuestions : this.props.notAnsweredQuestions
        }
        return (
            <div>
                <div className="center">
                    <button className="btn" onClick={() =>this.toggleShowAnswered()}
                            style={{opacity: showAnsweredPoles ? 1 : 0.2}}
                            disabled={showAnsweredPoles}>
                        "Answered Poles"
                    </button>
                    <button className="btn" onClick={() =>this.toggleShowAnswered()}
                            style={{opacity: !showAnsweredPoles ? 1 : 0.2}}
                            disabled={!showAnsweredPoles}>
                        "Not Answered Poles"
                    </button>
                </div>

                <ul>
                    {listToShow.questionsToShow.map((q)=>(
                        <li key={q.id}>
                            <PoleSummary id={q.id} wasAnsweredByUser={showAnsweredPoles}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
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