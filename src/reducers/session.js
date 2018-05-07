import { SESSION_LIST, SESSION_CLOSE, SESSION_CONNECT } from '../actions/types'

const initialState = {
    session_list: [],
    current_session: null,
    error: null,
};

// TODO: Add error checking
export default function session(state=initialState, action) {
    let action_type = action.type.replace('SERVER/', '');

    switch (action_type) {
        case SESSION_LIST:
            return {
                ...state,
                session_list: action.payload.sessions
            }

        case SESSION_CONNECT:
            return {
                ...state,
                current_session: action.payload
            }
        // case SESSION_CLOSE:
        //     return {
        //         ...state,
        //         current_session: null
        //     }

        default:
            return state;
    }
}