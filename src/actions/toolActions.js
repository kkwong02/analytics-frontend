import {
    FETCH_DATA,
    ADD_REQUEST,
    TOOL_MINIMIZE,
    TOOL_EDIT,
    TOOL_DELETE,
    TOOL_ADD,
    TOOL_SAVE,
    BUFFER_CREATE,
    BUFFER_DELETE,
    BUFFER_UPDATE
} from "./types";
import {
    send_request
} from "./websocketSend";

const uuidv4 = require('uuid/v4')
/**
 * Adds to request array
 * @param {string} uuid - uuid of the request.
 * @param {string|number} tool_id - id of the tool itself.
 * @param {number} tool_index - index of the tool in state
 */
export function add_request(uuid, tool_id, request) {
    return ({
        type: ADD_REQUEST,
        payload: {
            uuid: uuid,
            id: tool_id,
            request: request
        }
    })
}
/**
 * Sends request to server for some data.
 * @param {string} uuid - uuid of the request
 * @param {Object} params - params to be sent to the server
 */
export function fetch_data(uuid, params) {
    return send_request(FETCH_DATA, {
        uuid: uuid,
        ...params
    });
}
/**
 * Adds a new 'Tool' object to state.
 * @param {Object} tool - tool object
 */
export function add_tool(tool) {
    return ({
        type: TOOL_ADD,
        payload: {
            tool: tool,
            isOpen: true,
            edit: false,
            experiments: [],
        },
        meta: {
            id: uuidv4()
        }
    })
}

/**
 * Toggles the minimize attribute in the state of a tool.
 * @param {number} id - id of tool.
 */
export function toggle_minimize(id) {
    return ({
        type: TOOL_MINIMIZE,
        payload: {
            id: id
        }
    })
}
/**
 * toggles the edit modal.
 * @param {number} id - id of tool
 */
export function toggle_edit(id) {
    return ({
        type: TOOL_EDIT,
        payload: {
            id: id
        }
    })
}
/**
 * Deletes a tool.
 * If not saved to server, then it is just removed from state, else
 * request is sent to server then removed.
 * @param {number} id - id of tool
 */
export function delete_tool(id) {
    if (typeof (id) === 'string') {
        return ({
            type: TOOL_DELETE,
            payload: {
                id: id
            }
        })
    } else {
        return send_request(TOOL_DELETE, {
            id: id
        })
    }
}

/**
 * Adds a new key to buffer state. Used for editing and creating tools.
 * @param {number|string} id - id of the tool buffer is for.
 */
export function create_buffer(id) {
    return {
        type: BUFFER_CREATE,
        payload: {
            id: id
        }
    }
}

/**
 * Deletes buffer with id.
 * @param {number|string} id - id of tool
 */
export function delete_buffer(id, save) {
    return {
        type: BUFFER_DELETE,
        payload: {
            id: id,
            save: save
        }
    }
}

/**
 * Updates buffer for tool
 * @param {number|string} id - id of tool
 */
export function update_buffer(id, content) {
    return {
        type: BUFFER_UPDATE,
        payload: content,
        meta: {id: id}
    }
}
/**
 * Saves the tool object to the server.
 * Saves the tool and experiments fields in the tool object.
 * edit and isOpen will default to false and true respectively
 * @param {Object} tool - The tool object.
 */
export function save_tool(id, tool) {
    return send_request(TOOL_SAVE, {
        id: id,
        tool: tool.tool,
        experiments: tool.experiments
    });
}