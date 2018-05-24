import { send_request } from "./websocketSend";
import { SESSION_CONNECT, SESSION_CLOSE, SESSION_LIST } from "./types";

export function join_session(session){
    return send_request(SESSION_CONNECT, {id:Number(session)});
}

export function close_session(){
    return send_request(SESSION_CLOSE);
}

export function list_sessions() {
    return send_request(SESSION_LIST)
}