import { FETCH_DATA, ADD_REQUEST } from "./types";
import {send_request} from "./websocketSend";

const uuidv4 = require('uuid/v4')

export function add_request(request) {

    return ({
        type: ADD_REQUEST,
        payload: {
            uuid: uuidv4(),
            request: request
        }
    })
}

export function fetch_data(params) {
    return send_request(FETCH_DATA, params);
}
