import { showLoading, hideLoading } from 'react-redux-loading'
import { setAuthedUser } from "./authedUser";
import { getInitialData } from '../utils/api'
import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";

const AUTHED_ID = 'tylermcginnis' //TODO: change to block until a user logs in independently.

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users,questions}) =>{
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}