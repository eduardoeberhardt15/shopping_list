import {Reducer} from 'redux';

export interface IList{
    id: number,
    name:string,
    complete?:boolean,
    list:number,
    price?:number,
    amount?:number,
}
export interface IState{
    data:IList[],
    total: number,
    error:boolean,
    loading:boolean
}

const INITIAL_STATE:IState={

    data:[],
    total:0,
    error:false,
    loading:false
};


export const Types={
    LOAD_REQUEST:"LOAD_REQUEST",
    LOAD_SUCCESS:"LOAD_SUCCESS",
    LOAD_FAILURE:"LOAD_FAILURE",
    ADD_TODO:"ADD_TODO",
    UPDATE_TODO:"UPDATE_TODO",
    UPDATE_TODO_PRICE:"UPDATE_TODO_PRICE",
    UPDATE_TODO_AMOUNT:"UPDATE_TODO_AMOUNT",
    REMOVE_TODO:"REMOVE_TODO",
    GET_LIST:"GET_LIST",
    GET_LIST_ASYNC:"GET_LIST_ASYNC",
}

export type typeActions = 
    "LOAD_REQUEST" |
    "LOAD_SUCCESS" |
    "LOAD_FAILURE";

export interface IPayload{
    data:IList[],
    total:number
}

export interface IAction{
    type: typeActions,
    payload:IPayload
}

export const reducer:Reducer<IState, IAction> = (state= INITIAL_STATE, action:IAction)=>{
    
    switch(action.type){

        case "LOAD_REQUEST": 
            return { ...state, loading:true};

        case "LOAD_SUCCESS": 
            return { ...state, loading:false, error:false, 
                data:action.payload.data,
                total: action.payload.total ? action.payload.total : state.total
            };

        case "LOAD_FAILURE": 
            return { ...state, error:true, data:[]};

        default:
            return state;
    }

}
