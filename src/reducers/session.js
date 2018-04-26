import { LIST_SESSIONS, CREATE_SESSION, JOIN_SESSION } from '../actions/types'

const initialState = {
    session_list: [],
    session: null,
    new_session: {}
};

export default function session(state=initialState, action) {
    switch (action.type) {
        case LIST_SESSIONS:
            return {
                ...state,
                session_list: action.payload
            }
        case CREATE_SESSION:
            return {
                ...state,
                new_session: action.payload
            }

        case JOIN_SESSION:
            return {
                ...state,
                session: action.payload
            }

        default:
            return state;
    }
}