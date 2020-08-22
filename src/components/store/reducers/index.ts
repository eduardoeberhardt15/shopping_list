import {combineReducers} from 'redux';
import {reducer} from "./mainReducer";

export const reducers = combineReducers({
    reducerMain:reducer
  });

export type reducers = ReturnType<typeof reducers>