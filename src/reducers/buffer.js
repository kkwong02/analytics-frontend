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

        let plotter = {...state.tool.plotters[plotterIndex]};

        let data = state.tool.data.slice();
        action.payload.data.forEach(exp => {
            let response_data = exp.data.map(item => {
                let cast = {};
                Object.keys(item).forEach(key => {
                    // can't use || because 0 is falsey
                    cast[key] = isNaN(Number(item[key])) ? item[key] : Number(item[key]);
                });
                return cast;
            });

            let obj = data.find(item => item.id === plotter.items[exp.experiment]);

            if (obj) {
                obj.data = response_data;
            }
            else {
                obj = new DataProps(
                    state.tool.graphType,
                    state.experiments_list.filter(item => item.id === exp.experiment)[0].friendly_name,
                    response_data,
                    plotter.xAxis,
                    plotter.yAxis
                );
                plotter.items[exp.experiment] = obj.id;

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
