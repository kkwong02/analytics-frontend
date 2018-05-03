import { send_request } from "./websocketSend";
import { FETCH_PROJECTS } from "./types";

export function fetch_projects() {
    return send_request(FETCH_PROJECTS)
}