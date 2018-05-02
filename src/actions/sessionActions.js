import { SEND } from 'redux-websocket-bridge'

export function join_session(session_id){
    return {
        type: `@@websocket/${ SEND }`,
        payload: JSON.stringify({
            type: 'SESSION.CONNECT',
            payload: {
                pk: session_id
            }
        })
    };
}
