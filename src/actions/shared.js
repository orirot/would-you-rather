import { showLoading, hideLoading } from 'react-redux-loading'
import { setAuthedUser } from "./authedUser";
import { getInitialData } from '../utils/api'

const AUTHED_ID = 'tylermcginnis' //TODO: change to block until a user logs in independently.

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(() =>{
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}