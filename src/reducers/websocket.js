const initialState = {
    connected: false
}

export default function websocket(state=initialState, action) {
    switch (action.type) {
        case '@@websocket/OPEN':
            return {
                ...state,
                connected: true
            }

        default:
            return state
    }
}