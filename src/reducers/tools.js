import {
    TOOL_MINIMIZE,
    TOOL_EDIT,
    TOOL_ADD,
    TOOL_SAVE,
    TOOL_DELETE,
} from '../actions/types';

const initialState = {
    tools_list: new Map(),
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
        };
    case 'SERVER/' + TOOL_DELETE:
        if (action.error) {
            console.log(action.payload.error);
            return state;
        }
        // else fall through and delete.
    case TOOL_DELETE:
        newState = new Map(state.tools_list);
        newState.delete(action.payload.id);

        return {
            ...state,
            tools_list: newState
        };

    case TOOL_MINIMIZE:
        tool = {
            ...state.tools_list.get(action.payload.id)
        };
        tool.isOpen = !tool.isOpen;

        return {
            ...state,
            tools_list: new Map(state.tools_list).set(action.payload.id, tool)
        };

    case TOOL_EDIT:{
        let tools_list = new Map(state.tools_list);
        let tool = tools_list.get(action.meta.id);
        tool = Object.assign(tool, action.payload);
        tools_list.set(action.meta.id, tool);

        return {
            ...state,
            tools_list: tools_list
        };
    }

    case 'SERVER/' + TOOL_SAVE:
    default:
        return state;
    }

}