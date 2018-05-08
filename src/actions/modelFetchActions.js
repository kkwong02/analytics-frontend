import { send_request } from "./websocketSend";
import { FETCH_PROJECTS, FETCH_EXPERIMENTS } from "./types";

export function fetch_projects() {
    return send_request(FETCH_PROJECTS)
}

export function fetch_experiments(params) {
    return send_request(FETCH_EXPERIMENTS, params);
}