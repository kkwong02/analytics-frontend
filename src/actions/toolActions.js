import { FETCH_DATA, ADD_REQUEST, ADD_TOOL } from "./types";
import {send_request} from "./websocketSend";

const uuidv4 = require('uuid/v4')

export function add_request(uuid, request) {
    return ({
        type: ADD_REQUEST,
        payload: {
            uuid: uuid,
            request: request
        }
    })
}

export function fetch_data(uuid, params) {
    return send_request(FETCH_DATA, {uuid: uuid, ...params});
}

export function add_tool(tool) {
    return ({
        type: ADD_TOOL,
        payload: {
            id: uuidv4(), // generate a temporary id. Replace with the server id after saving first time
            tool: tool
        }
    })
}