import { call, put, select } from 'redux-saga/effects';
import { Types } from '../reducers/mainReducer';
//import api from '../../../services/api';

//import { loadSuccess, loadFailure } from './actions';

export function* load() {
  try {
    
    yield
    //const response = yield call(api.get, 'repos/user');

   // yield put(loadSuccess(response.data));
  } catch (err) {
    //yield put(loadFailure());
  }
}

export function* addTodo(arg:any) { 
  try {
    
    yield put({type: "LOAD_REQUEST"});
    const datas = yield select(reducer =>reducer.reducerMain.data); 
    console.log(datas);
    
   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas, arg.payload.data]}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

