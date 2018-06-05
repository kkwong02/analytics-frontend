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
    case ADD_REQUEST:{
        return {
            ...state,
            requests: {
                ...state.requests,
                [action.meta.uuid]: action.payload.plotter
            }
        };}

    case BUFFER_CLEAR:{
        return {
            ...initialState,
            prevExperiments: state.experiments
        };}

    case BUFFER_UPDATE:{
        return {
            ...state,
            ...action.payload
        };}

    case 'SERVER/' + FETCH_DATA: {
        if (!state.requests.hasOwnProperty(action.meta.uuid)){
            // ignore if the request doesn't exist.
            return state;
        }
        let plotterIndex = state.tool.plotters.findIndex(item => item.id === state.requests[action.meta.uuid]);

        let plotter = Object.assign({}, state.tool.plotters[plotterIndex]);
        console.log(state.requests[action.meta.uuid]);

        let data = state.tool.data.slice();
        action.payload.data.forEach(exp => {
            let obj = data[plotter.items[exp.experiment]];
            if (obj) {
                obj.data = exp.data;
            }
            else {
                obj = new DataProps(
                    state.tool.graphType,
                    state.experiments_list.filter(item => item.id === exp.experiment)[0].friendly_name,
                    exp.data,
                    plotter.xAxis,
                    plotter.yAxis
                );
                // plotter.items[exp.experiment] = obj.id;

                data.push(obj);
            }
        });

        let plotters = state.tool.plotters.slice();
        plotters[plotterIndex] = plotter;

        return {
            ...state,
            tool: {
                ...state.tool,
                data: data,
                plotters: plotters
            }
        };
    }

    case 'SERVER/' + FETCH_EXPERIMENTS:{
        return {
            ...state,
            experiments_list: action.payload
        };}

    default:
        return state;
    }
}
