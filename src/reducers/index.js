import { combineReducers } from "redux";
import session from "./session"
import tools from "./tools";

import { SESSION_CLOSE } from "../actions/types";


const appReducer = combineReducers({
    session,
    tools
});

export default (state, action) => {
    if (action.type === 'SERVER/'+SESSION_CLOSE) {
        state = undefined
    }
    return appReducer(state, action)
}