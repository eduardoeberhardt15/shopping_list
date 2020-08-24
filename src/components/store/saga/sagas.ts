import { call, put, select } from 'redux-saga/effects';
import { Types, IList } from '../reducers/mainReducer';
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
    
   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas, arg.payload.data]}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

export function* updateTodo(arg:any) { 
  try {
    
    yield put({type: "LOAD_REQUEST"});
    let datas:IList[] = yield select(reducer =>reducer.reducerMain.data); 
    
    datas= datas.map(data=> { 
      if(data.id===arg.payload.data.id){
        data.complete=!data.complete;
      }
      return data;
    }); 
    
   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas]}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

export function* deleteTodo(arg:any) { 
  try {
    
    yield put({type: "LOAD_REQUEST"});
    let datas:IList[] = yield select(reducer =>reducer.reducerMain.data); 
    
    datas= datas.filter(data=> { 
      if(data.id!==arg.payload.data.id){
        return data;
      }
      
    }); 

   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas]}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

