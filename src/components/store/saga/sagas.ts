import { call, put, select } from 'redux-saga/effects';
import { Types, IList } from '../reducers/mainReducer';

import listItemController from '../../../database/controllers/list_item';
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
    
    const controller = listItemController();

    yield put({type: "LOAD_REQUEST"});
    let datas:IList[] = yield select(reducer =>reducer.reducerMain.data); 
    
    datas= datas.map(data=> { 
      if(data.id===arg.payload.data.id){
        data.complete=!data.complete;
      }
      return data;
    }); 
    
    yield call(controller.update, arg.payload.data);

   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas]}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

export function* updateTodoPrice(arg:any) {
  try {
    
    const controller = listItemController();

    yield put({type: "LOAD_REQUEST"});
    let datas:IList[] = yield select(reducer =>reducer.reducerMain.data); 
    
    datas= datas.map(data=> { 
      if(data.id===arg.payload.data.id){
        data.price=arg.payload.data.price
      }
      return data;
    }); 
    
    yield call(controller.update, arg.payload.data);

    const total = yield getTotalAsync(arg.payload.data.list); 

   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas], total}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

export function* updateTodoAmount(arg:any) {
  try {
    
    const controller = listItemController();

    yield put({type: "LOAD_REQUEST"});
    let datas:IList[] = yield select(reducer =>reducer.reducerMain.data); 
    
    datas= datas.map(data=> { 
      if(data.id===arg.payload.data.id){
        data.amount=arg.payload.data.amount
      }
      return data;
    }); 
    
    yield call(controller.update, arg.payload.data);

    const total = yield getTotalAsync(arg.payload.data.list); 

   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas], total}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

export function* deleteTodo(arg:any) { 
  try {
    
    const controller = listItemController();
    yield put({type: "LOAD_REQUEST"});
    let datas:IList[] = yield select(reducer =>reducer.reducerMain.data); 
    
    datas= datas.filter(data=> { 
      if(data.id!==arg.payload.data.id){
        return data;
      }
      
    }); 

    yield call(controller.deleteItem, arg.payload.data);

   yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas]}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

export function* getListAsync(arg:any) { 
  try {
    
    const id = arg.payload.data;
    const controller = listItemController();
    yield put({type: "LOAD_REQUEST"});
    let datas:IList[] = [];
    
    datas= yield call(controller.findByListId, id);
    const total = yield getTotalAsync(id);
    yield put({type:Types.LOAD_SUCCESS, payload:{data: [...datas], total}});
  } catch (err) {
    yield put({type: "LOAD_FAILURE"});
  }
}

export function* getTotalAsync(id:number) { 
  try {
    
    const controller = listItemController();
    
    const total = yield call(controller.totalPriceById, id); 
    return total;

  } catch (err) {
    return 0;
  }
}

