import { SEND } from 'redux-websocket-bridge'

export function join_session(session){
    return {
        type: `@@websocket/${ SEND }`,
        payload: JSON.stringify({
            type: 'SESSION.CONNECT',
            payload: session
        })
    };
}
