import {FIRST_START} from '../actions/actionTypes'

const initialState = {
    firstStart: true
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case FIRST_START:
            return {
                ...state, firstStart: false
            }
        default:
            return state
    }
}