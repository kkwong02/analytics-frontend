import { BUFFER_CLEAR, BUFFER_UPDATE } from '../actions/types'

const initialState = {
    tool_id: null,
    tool: {name: null},
    experiments: [],
    prevExperiments: []
};

export default function buffer(state=initialState, action){
    switch (action.type) {
        case BUFFER_CLEAR:
            return {
                ...initialState,
                prevExperiments: state.experiments
            };

        case BUFFER_UPDATE:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
