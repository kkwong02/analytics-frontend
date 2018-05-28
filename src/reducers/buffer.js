import {
    BUFFER_CLEAR,
    BUFFER_UPDATE,
    FETCH_DATA,
    ADD_REQUEST,
} from '../actions/types'
import { DataProps } from "../toolFactories/GraphFactory";

const initialState = {
    tool_id: null,
    tool: {},
    experiments: [],
    prevExperiments: [],
    requests: {},
    experiments_list: []
};

export default function buffer(state=initialState, action){
    switch (action.type) {
        case ADD_REQUEST:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.meta.uuid]: {
                        ...action.payload
                    }
                }
            }

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

        case 'SERVER/' + FETCH_DATA:
            console.log(action.payload.data)
            // let dataObjs = action.payload.data.map(dataSet => {
            //     return new DataProps()
            // })
            return state;

        default:
            return state;
    }
}
