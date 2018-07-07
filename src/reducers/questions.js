import { RECEIVE_QUESTIONS, SAVE_VOTE_FOR_QUESTION, PRESSED_VOTE_FOR_QUESTION, DISABLE_PRESS_VOTE_FOR_QUESTION, SAVE_QUESTION } from "../actions/questions";
import authedUser from "./authedUser";

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case SAVE_QUESTION:
            return {
                ...state,
                    [action.question.id]:action.question
            }
        case SAVE_VOTE_FOR_QUESTION:
            return {
                ...state,
                    [action.question.id]:action.question,
            }
        case PRESSED_VOTE_FOR_QUESTION:
        case DISABLE_PRESS_VOTE_FOR_QUESTION:
            return {
                ...state,
                [action.question.id]:action.question //TODO: maybe push just the voted not all of the question
            }
        default:
            return state
    }
}