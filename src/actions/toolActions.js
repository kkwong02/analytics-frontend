import { FETCH_DATA, ADD_REQUEST } from "./types";
import {send_request} from "./websocketSend";

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
