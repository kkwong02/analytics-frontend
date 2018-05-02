import { SERVER_SESSION_LIST, SERVER_SESSION_CLOSE, SERVER_SESSION_CONNECT } from '../actions/types'

const initialState = {
    session_list: [],
    current_session: null,
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

        case SERVER_SESSION_CONNECT:
            return {
                ...state,
                current_session: action.payload
            }
        case SERVER_SESSION_CLOSE:
            return {
                ...state,
                current_session: null
            }

        default:
            return state;
    }
}