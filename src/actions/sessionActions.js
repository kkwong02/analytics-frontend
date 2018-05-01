import { SEND } from 'redux-websocket-bridge'

function create_session(session){
    return {
        type: `@@websocket/${ SEND }`,
        payload: JSON.stringify(session)
    };
}
