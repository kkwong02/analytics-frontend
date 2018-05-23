import { BUFFER_UPDATE, BUFFER_CLEAR } from "./types";

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