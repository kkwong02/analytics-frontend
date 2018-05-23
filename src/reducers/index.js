import { combineReducers } from "redux";
import session from "./session"
import tools from "./tools";
import buffer from "./buffer";

import { SESSION_CLOSE } from "../actions/types";


const appReducer = combineReducers({
    session,
    tools,
    buffer
});

export default (state, action) => {
    if (action.type === 'SERVER/'+SESSION_CLOSE) {
        state = undefined
    }
    return appReducer(state, action)
}