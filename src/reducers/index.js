import { combineReducers } from "redux";
import session from "./session"
import tools from "./tools";

export default combineReducers({
    session,
    tools
});

