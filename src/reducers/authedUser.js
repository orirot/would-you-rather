import {SET_AUTHED_USER, SIGN_OUT} from "../actions/authedUser";

export default function authedUser (state = null, action) {
    switch(action.type) {
        case SET_AUTHED_USER:
        case SIGN_OUT:
            return action.id
        default:
            return state
    }
}