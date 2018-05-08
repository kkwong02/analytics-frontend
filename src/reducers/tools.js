import { FETCH_DATA, ADD_REQUEST, TOOL_MINIMIZE, TOOL_EDIT, TOOL_ADD } from "../actions/types";

const initialState = {
    experiments: [],
    tools_list: new Map(),
    requests: {},
};

export default function tools(state=initialState, action) {
    let tool;
    let newState;

    switch (action.type) {
        case 'SERVER/'+ FETCH_DATA:
            if (action.error) {
                return state
            }
            if (state.requests[action.payload.uuid]){

            }
            return state;

        case ADD_REQUEST:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.uuid]: {
                        id: action.payload.id,
                    }
                }
            }

        case TOOL_MINIMIZE:
            tool = {...state.tools_list.get(action.payload.id)}
            tool.isOpen = !tool.isOpen;

            return {
                ...state,
                tools_list: new Map(state.tools_list).set(action.payload.id, tool)
            };

        case TOOL_EDIT:
            tool = {...state.tools_list.get(action.payload.id)};
            tool.edit = !tool.edit;

            return {
                ...state,
                tools_list: new Map(state.tools_list).set(action.payload.id, tool)
            }

        default:
            return state;
    }

};