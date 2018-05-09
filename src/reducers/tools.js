import {
    FETCH_DATA,
    ADD_REQUEST,
    TOOL_MINIMIZE,
    TOOL_EDIT,
    TOOL_ADD,
    TOOL_SAVE,
    TOOL_DELETE,
    FETCH_EXPERIMENTS,
    BUFFER_CREATE,
    BUFFER_DELETE,
    BUFFER_UPDATE
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
        case 'SERVER/' + FETCH_DATA:
            if (action.error) {
                return state
            }
            if (state.requests[action.payload.uuid]) {

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
                buffer: {
                    [action.meta.id]: action.payload
                }
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

        case BUFFER_CREATE:
            tool = state.tools_list.get(action.payload.id);
            let experiments = tool.experiments.length > 0 ? tool.experiments : state.prev_experiments;
            return {
                ...state,
                buffer: {
                    ...state.buffer,
                    [action.payload.id]: {
                        tool: {...tool.tool},
                        experiments: [...experiments]
                    }
                }
            }
        case BUFFER_DELETE:
            newState = {...state};
            if (action.payload.save) {
                newState.tools_list.set(action.payload.id, {
                    ...state.tools_list.get(action.payload.id),
                    tool: state.buffer[action.payload.id].tool,
                    experiment: state.buffer[action.payload.id].experiments
                })
            };
            delete newState.buffer[action.payload.id];
            return newState;

        case BUFFER_UPDATE:
            return {
                ...state,
                buffer: {
                    ...state.buffer,
                    [action.payload.id]: action.payload
                }
            }
        case 'SERVER/' + TOOL_SAVE:
        default:
            return state;
    }

};