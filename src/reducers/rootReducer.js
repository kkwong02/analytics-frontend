import {SESSION_CLOSE} from "../actions/types";

export default (state, action) => {
    if (action.type === SESSION_CLOSE) {
        state = undefined
    }
    return appReducer(state, action)
}
