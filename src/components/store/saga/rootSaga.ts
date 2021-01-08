import { all, takeLatest } from 'redux-saga/effects';

import { Types } from '../reducers/mainReducer';
import { addTodo, load, updateTodo, updateTodoPrice, updateTodoAmount ,deleteTodo, getListAsync } from './sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(Types.LOAD_REQUEST, load),
    takeLatest(Types.ADD_TODO, addTodo),
    takeLatest(Types.UPDATE_TODO, updateTodo),
    takeLatest(Types.UPDATE_TODO_PRICE, updateTodoPrice),
    takeLatest(Types.UPDATE_TODO_AMOUNT, updateTodoAmount),
    takeLatest(Types.REMOVE_TODO, deleteTodo),
    takeLatest(Types.GET_LIST_ASYNC, getListAsync),
  ]);
}
