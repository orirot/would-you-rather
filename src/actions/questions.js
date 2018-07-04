import { showLoading, hideLoading } from 'react-redux-loading'

import { _saveQuestionAnswer } from "../utils/_Data";
import {updateUser} from "./users";
import authedUser from "../reducers/authedUser";
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

export function handleSaveVoteForQuestion (question, answer, authedUser){
    const qid = question.id
    return (dispatch, getState) => {
        dispatch (pressedVoteForQuestion(question, authedUser))
        dispatch(showLoading())
        return _saveQuestionAnswer({authedUser, qid, answer})
            .then(() => {
                const { users } = getState()
                const _user = addVoteToUser(users, authedUser, qid, answer)
                const _question = addVoteToQuestion(question, answer, authedUser)
                dispatch(updateUser(_user))
                dispatch(saveVoteForQuestion(_question, authedUser))
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

function saveVoteForQuestion (question, authedUser){
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

const addVoteToUser = (users, authedUser, qid, answer) => {
    return {
        ...users[authedUser],
        answers: {
            ...users[authedUser].answers,
            [qid]: answer
        }
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