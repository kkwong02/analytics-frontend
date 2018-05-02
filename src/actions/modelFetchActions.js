import {SEND} from 'redux-websocket-bridge'

export function fetch_projects() {
    return {
        type: `@@websocket/${SEND}`,
        payload: JSON.stringify({
            type: 'SESSION.CONNECT',
            payload: JSON.stringify(session)
        })
    };
}