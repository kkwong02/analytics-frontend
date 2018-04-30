import { createStore, applyMiddleware, compose } from 'redux';
import ReduxWebSocketBridge from 'redux-websocket-bridge'
import rootReducer from "./reducers";

const initialState = {};

const middleware = [
    ReduxWebSocketBridge('ws://localhost/analytics/')
];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
);

export default store;