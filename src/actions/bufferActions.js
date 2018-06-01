import { BUFFER_UPDATE, BUFFER_CLEAR, ADD_REQUEST, FETCH_DATA } from "./types";

import {send_request} from './websocketSend';

export function buffer_clear() {
    return ({
        type: BUFFER_CLEAR
    })
}

export function buffer_update(content) {
    return ({
        type: BUFFER_UPDATE,
        payload: content
    })
}

/**
 * Adds to request array
 * @param {string} uuid - uuid of the request.
 * @param {string|number} tool_id - id of the tool itself.
 * @param {number} tool_index - index of the tool in state
 */
export function add_request(uuid, plotter) {
    return ({
        type: ADD_REQUEST,
        payload: {
            plotter: plotter
        },
        meta: {
            uuid: uuid
        }
    });
}

/**
 * Sends request to server for some data.
 * @param {string} uuid - uuid of the request
 * @param {Object} params - params to be sent to the server
 */
export function fetch_data(uuid, experiments, expressions) {
    return send_request(FETCH_DATA, {
        experiments: experiments,
        expressions: expressions
    }, {
        uuid: uuid
    });
}