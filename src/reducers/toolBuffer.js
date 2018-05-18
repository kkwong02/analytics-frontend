import { BUFFER_CLEAR, BUFFER_UPDATE } from '../actions/types'

const initialState = {
    tool_id: null,
    tool: null,
    experiments: [],
};

export default function toolBuffer(state=initialState, action){
    switch (action.type) {
        case BUFFER_CLEAR:
            return initialState;

        case BUFFER_UPDATE:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
