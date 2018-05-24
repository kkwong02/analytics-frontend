import { SEND } from "redux-websocket-bridge";

export function send_request(type, payload, meta) {
    return ({
        type: `@@websocket/${ SEND }`,
        payload: JSON.stringify({
            type: type,
            payload: payload,
            meta: meta
        })
    })
};
