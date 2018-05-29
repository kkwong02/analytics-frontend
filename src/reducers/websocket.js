const initialState = {
    connected: false
};

export default function websocket(state=initialState, action) {
    switch (action.type) {
    case '@@websocket/OPEN':
        return {
            ...state,
            connected: true
        };
    case 'SERVER/SESSION.CLOSE' :
        return {
            connected: true
        };

    default:
        return state;
    }
}