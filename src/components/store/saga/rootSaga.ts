import { all, takeLatest } from 'redux-saga/effects';

import { Types } from '../reducers/mainReducer';
import { addTodo, load, updateTodo, deleteTodo } from './sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(Types.LOAD_REQUEST, load),
    takeLatest(Types.ADD_TODO, addTodo),
    takeLatest(Types.UPDATE_TODO, updateTodo),
    takeLatest(Types.REMOVE_TODO, deleteTodo),
  ]);
}
