import { combineReducers } from "redux";
import session from "./session"
import tools from "./tools";
import buffer from "./buffer";
import websocket from "./websocket";

export default combineReducers({
    session,
    tools,
    buffer,
    websocket
});