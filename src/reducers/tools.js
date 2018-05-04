import { FETCH_DATA, ADD_REQUEST } from "../actions/types";

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