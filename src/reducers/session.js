import { SESSION_LIST, SESSION_CLOSE, SESSION_CREATE, SESSION_JOIN } from '../actions/types'

const initialState = {
    session_list: [],
    session: null,
    new_session: {}
};

export default function session(state=initialState, action) {
    switch (action.type) {
        case SESSION_LIST:
            return {
                ...state,
                session_list: action.payload
            }
        case SESSION_CREATE:
            return {
                ...state,
                new_session: action.payload
            }

        case SESSION_JOIN:
            return {
                ...state,
                session: action.payload
            }
        case SESSION_CLOSE:
            return {
                ...state,
                session: null
            }

        default:
            return state;
    }
}