import { all, takeLatest } from 'redux-saga/effects';

import { Types } from '../reducers/mainReducer';
import { addTodo, load } from './sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(Types.LOAD_REQUEST, load),
    takeLatest(Types.ADD_TODO, addTodo),
  ]);
}
