import {
    TOOL_MINIMIZE,
    TOOL_EDIT,
    TOOL_ADD,
    TOOL_SAVE,
    TOOL_DELETE,
    FETCH_EXPERIMENTS
} from "../actions/types";

const initialState = {
    experiments_set: [],
    tools_list: new Map(),
    requests: {},
    buffer: {},
    prev_experiments: [] // dump from last saved buffer.
};

export default function tools(state = initialState, action) {
    let tool;
    let newState;

    switch (action.type) {

        case TOOL_SAVE:
            newState = new Map(state.tools_list);

            if (action.meta.new) {
                newState.delete(action.meta.uuid);
            }

            newState.set(action.meta.id, action.payload);

            return {
                ...state,
                tools_list: newState
            };

        case TOOL_ADD:
            newState = new Map(state.tools_list);
            newState.set(action.meta.id, action.payload);

            return {
                ...state,
                tools_list: newState,
            }
        case 'SERVER/' + TOOL_DELETE:
            if (action.error) {
                console.log(action.payload.error);
                return state
            }
            // else fall through and delete.
        case TOOL_DELETE:
            newState = new Map(state.tools_list);
            newState.delete(action.payload.id)

            return {
                ...state,
                tools_list: newState
            };

        case TOOL_MINIMIZE:
            tool = { ...state.tools_list.get(action.payload.id)
            }
            tool.isOpen = !tool.isOpen;

            return {
                ...state,
                tools_list: new Map(state.tools_list).set(action.payload.id, tool)
            };

        case TOOL_EDIT:
            tool = { ...state.tools_list.get(action.payload.id)
            };
            tool.edit = !tool.edit;

            return {
                ...state,
                tools_list: new Map(state.tools_list).set(action.payload.id, tool)
            }

        case 'SERVER/' + FETCH_EXPERIMENTS:
            return {
                ...state,
                experiments_set: action.payload
            }

        case 'SERVER/' + TOOL_SAVE:
        default:
            return state;
    }

};