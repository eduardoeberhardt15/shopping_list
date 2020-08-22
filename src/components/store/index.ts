import {createStore, applyMiddleware, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from "./saga/rootSaga";
import {reducers} from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const store:Store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;