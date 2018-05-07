import { FETCH_DATA, ADD_REQUEST, ADD_TOOL, TOOL_MINIMIZE, TOOL_EDIT, DELETE_TOOL} from "./types";
import {send_request} from "./websocketSend";

const uuidv4 = require('uuid/v4')
/**
 * Adds to request array
 * @param {string} uuid - uuid of the request.
 * @param {string|number} tool_id - id of the tool itself.
 * @param {number} tool_index - index of the tool in state
 */
export function add_request(uuid, tool_id, tool_index) {
    return ({
        type: ADD_REQUEST,
        payload: {
            uuid: uuid,
            id: tool_id,
            index: tool_index
        }
    })
}
/**
 * Sends request to server for some data.
 * @param {string} uuid - uuid of the request
 * @param {Object} params - params to be sent to the server
 */
export function fetch_data(uuid, params) {
    return send_request(FETCH_DATA, {uuid: uuid, ...params});
}
/**
 * Adds a new 'Tool' object to state.
 * @param {Object} tool - tool object
 */
export function add_tool(tool) {
    return ({
        type: ADD_TOOL,
        payload: {
            id: uuidv4(),
            tool: tool,
            isOpen: true,
            edit: true,
        }
    })
}

/**
 * Toggles the minimize attribute in the state of a tool.
 * @param {number} tool_index - index of tool in state
 */
export function toggle_minimize(tool_index) {
    return ({
        type: TOOL_MINIMIZE,
        payload: {
            index: tool_index
        }
    })
}
/**
 * toggles the edit modal.
 * @param {number} tool_index - index of tool in state
 */
export function toggle_edit(tool_index) {
    return ({
        type: TOOL_EDIT,
        payload: {
            index: tool_index
        }
    })
}
/**
 * Deletes the tool from client side only.
 * Used when the tool is not saved to server side.
 * @param {number} tool_index - index of tool in state
 */
export function delete_tool(tool_index) {
    return ({
        type: DELETE_TOOL,
        payload: {
            index: tool_index
        }
    })
}
/**
 * Deletes the tool from the server side.
 * @param {number} tool_id - id of tool from server
 * @param {number} tool_index - index of tool in state.
 */
export function server_delete_tool(tool_id, tool_index) {
    send_request(DELETE_TOOL, {id: tool_id, index: tool_index});
}