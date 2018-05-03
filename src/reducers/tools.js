import { FETCH_DATA, ADD_REQUEST } from "../actions/types";

const initialState = {
    experiments: [],
    tools_list: [],
    tools_map: [],
    requests: {},
};

export default function tools(state=initialState, action) {

    switch (action.type) {
        case 'SERVER/'+ FETCH_DATA:
            // ????
            if (state.request[action.payload.uuid]){
                console.log("it does something.")
            }
            return state;

        case ADD_REQUEST:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.uuid]: action.payload.request
                }
            }

        default:
            return state;
    }

};