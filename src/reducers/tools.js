import { FETCH_DATA, ADD_REQUEST } from "../actions/types";

const initialState = {
    tools_list = [],
    tool_map = [],
    requests = {}
}

export default function tools(state=initialState, action) {

    switch (action.type) {
        case 'SERVER/'+ FETCH_DATA:
            // ????
            break;

        case ADD_REQUEST:
            return {
                ...state,
                requests: {...state.requests, [action.payload.uuid]: action.payload.request}
            }

        default:
            break;
    }

}