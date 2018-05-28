import {
    TOOL_MINIMIZE,
    TOOL_EDIT,
    TOOL_DELETE,
    TOOL_ADD,
    TOOL_SAVE
} from "./types";
import {
    send_request
} from "./websocketSend";

/**
 * Adds a new 'Tool' object to state.
 * @param {Object} tool - tool object
 */
export function add_tool(tool, id) {
    return ({
        type: TOOL_ADD,
        payload: {
            tool: tool,
            isOpen: true,
            experiments: [],
            edit: false
        },
        meta: {
            id: id
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