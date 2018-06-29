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

export function handleSaveVoteForQuestion (info){
    return (dispatch) => {
        dispatch (pressedVoteForQuestion(info))
        return _saveQuestion(info.question)
            .then(dispatch(saveVoteForQuestion(info)))
            .catch((e) => {
                console.warn('Error in handleSaveVoteForQuestion: ', e)
                dispatch(disablePressVoteForQuestion(info))
                alert('Error in Saving the vote in the server. Try again.')
            })
    }
}

function pressedVoteForQuestion ({question, authedUser}){
    question.voted = true //TODO: hardcoded
    return {
        type: PRESSED_VOTE_FOR_QUESTION,
        question,
        authedUser
    }
}

function disablePressVoteForQuestion ({question, authedUser}){
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



// export function handleSaveVote(){
//
// }