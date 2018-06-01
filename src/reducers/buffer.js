import {
    BUFFER_CLEAR,
    BUFFER_UPDATE,
    FETCH_DATA,
    ADD_REQUEST,
    FETCH_EXPERIMENTS
} from '../actions/types';
import { DataProps } from '../toolFactories/GraphFactory';

const initialState = {
    tool_id: null,
    tool: {},
    experiments: [],
    prevExperiments: [],
    requests: {},
    experiments_list: [] // list of experiments returned from fetch
};

export default function buffer(state=initialState, action){
    switch (action.type) {
    case ADD_REQUEST:
        return {
            ...state,
            requests: {
                ...state.requests,
                [action.meta.uuid]: action.payload.plotter
            }
        };

    case BUFFER_CLEAR:
        return {
            ...initialState,
            prevExperiments: state.experiments
        };

    case BUFFER_UPDATE:
        return {
            ...state,
            ...action.payload
        };

    case 'SERVER/' + FETCH_DATA: {
        if (!state.requests.hasOwnProperty(action.meta.uuid)){
            // ignore if the request doesn't exist.
            return state;
        }
        let plotter = state.requests[action.meta.uuid];
        let obj = action.payload.data.map(exp => {
            let obj = {...state.tool.data[plotter.items[exp.experiment]]};
            if (obj) {
                obj = Object.assign({data: exp.data});
            }
            else {
                obj = new DataProps(state.tool.graphType, state.experiments_list.filter(item => item.id === exp.experiment)[0].friendly_name, plotter.xAxis, plotter.yAxis);
            }
        });
        console.log(obj);
        return state;
    }

    case 'SERVER/' + FETCH_EXPERIMENTS:
        return {
            ...state,
            experiments_list: action.payload
        };

    default:
        return state;
    }
}
