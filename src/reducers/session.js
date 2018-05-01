import { SERVER_SESSION_LIST, SERVER_SESSION_CLOSE, SERVER_SESSION_CREATE, SERVER_SESSION_JOIN } from '../actions/types'

const initialState = {
    session_list: [],
    current_session: null,
    new_session: {},
    error: null,
};

// TODO: Add error checking
export default function session(state=initialState, action) {
    switch (action.type) {
        case SERVER_SESSION_LIST:
            return {
                ...state,
                session_list: action.payload.sessions
            }
        case SERVER_SESSION_CREATE:
            return {
                ...state,
                new_session: action.payload
            }

        case SERVER_SESSION_JOIN:
            return {
                ...state,
                session: action.payload
            }
        case SERVER_SESSION_CLOSE:
            return {
                ...state,
                session: null
            }

        default:
            return state;
    }
}