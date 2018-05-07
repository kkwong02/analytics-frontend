import { FETCH_DATA, ADD_REQUEST, ADD_TOOL, TOOL_MINIMIZE, TOOL_EDIT } from "../actions/types";

const initialState = {
    experiments: [],
    tools_list: [],
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
                        index: action.payload.index
                    }
                }
            }

        case ADD_TOOL:
            return {
                ...state,
                tools_list: [...state.tools_list, action.payload]
            }

        case TOOL_MINIMIZE:
            tool = {...state.tools_list[action.payload.index]};
            tool.isOpen = !tool.isOpen;

            let newState = [...state.tools_list];
            newState.splice(action.payload.index, 1, tool);

            return {
                ...state,
                tools_list: newState
            };
        case TOOL_EDIT:
            tool = {...state.tools_list[action.payload.index]};
            tool.edit = !tool.edit;

            newState = [...state.tools_list];
            newState.splice(action.payload.index, 1, tool);

            return {
                ...state,
                tools_list: newState
            }

        default:
            return state;
    }

};