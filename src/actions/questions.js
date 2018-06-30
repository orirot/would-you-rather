import { showLoading, hideLoading } from 'react-redux-loading'

import {_saveQuestion} from "../utils/_Data";
// import {VOTED} from "../components/PoleVoting" //TODO

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_VOTE_FOR_QUESTION = 'SAVE_VOTE_FOR_QUESTION'
export const PRESSED_VOTE_FOR_QUESTION = 'PRESSED_VOTE_FOR_QUESTION'
export const DISABLE_PRESS_VOTE_FOR_QUESTION = 'DISABLE_PRESS_VOTE_FOR_QUESTION'

export function receiveQuestions (questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function handleSaveVoteForQuestion (question, option, authedUser){
    const votedQuestion = addVoteToQuestion(question, option, authedUser)
    return (dispatch) => {
        dispatch (pressedVoteForQuestion(question, authedUser))
        dispatch(showLoading())
        return _saveQuestion(votedQuestion)
            .then((question, authedUser) => {
                dispatch(saveVoteForQuestion({votedQuestion, authedUser}))
            })

            .catch((e) => {
                console.warn('Error in handleSaveVoteForQuestion: ', e)
                dispatch(disablePressVoteForQuestion(question, authedUser))
                alert('Error in Saving the vote in the server. Try again.')
            }).finally(() => {
                dispatch(hideLoading())
            })

    }
}

function pressedVoteForQuestion (question, authedUser){
    question.voted = true //TODO: hardcoded
    return {
        type: PRESSED_VOTE_FOR_QUESTION,
        question,
        authedUser
    }
}

function disablePressVoteForQuestion (question, authedUser){
    question.voted = false //TODO: hardcoded
    return {
        type: DISABLE_PRESS_VOTE_FOR_QUESTION,
        question,
        authedUser
    }
}

function saveVoteForQuestion ({question, authedUser}){
    return {
        type: SAVE_VOTE_FOR_QUESTION,
        question,
        authedUser
    }
}

//return a question with the new vote inside
const addVoteToQuestion= (question, chosenOptionName, authedUser) => {
    const _votes = question[chosenOptionName].votes.concat(authedUser)
    const _option = { ...(question[chosenOptionName]), votes:_votes}
    return {
        ...question, [chosenOptionName]:_option
    }
}

// handleVote = (question, option, authedUser) => {
//     const _question = addVoteToQuestion(question, option)
//     this.props.dispatch(handleSaveVoteForQuestion({
//         question: _question,
//         authedUser: authedUser
//     }))
// }

// export function handleSaveVote(){
//
// }