import { FETCH_DATA, ADD_REQUEST, ADD_TOOL } from "../actions/types";

const initialState = {
    experiments: [],
    tools_list: [],
    requests: {},
};

export default function tools(state=initialState, action) {

    switch (action.type) {
        case 'SERVER/'+ FETCH_DATA:
            if (action.error) {
                return state
            }
            if (state.requests[action.payload.uuid]){
                console.log(action.payload);
                //  get the tool to update
                // do something according to the request

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

        case ADD_TOOL:
            return {
                ...state,
                tools_list: [...state.tools_list, action.payload]
            }

        default:
            return state;
    }

};