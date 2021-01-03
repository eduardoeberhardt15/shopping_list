import {Reducer} from 'redux';

export interface IList{
    id: number,
    name:string,
    complete?:boolean,
    list:number,
    value?:number
}
export interface IState{
    data:IList[],
    error:boolean,
    loading:boolean
}

const INITIAL_STATE:IState={

    data:[],
    error:false,
    loading:false
};


export const Types={
    LOAD_REQUEST:"LOAD_REQUEST",
    LOAD_SUCCESS:"LOAD_SUCCESS",
    LOAD_FAILURE:"LOAD_FAILURE",
    ADD_TODO:"ADD_TODO",
    UPDATE_TODO:"UPDATE_TODO",
    REMOVE_TODO:"REMOVE_TODO",
    GET_LIST:"GET_LIST",
    GET_LIST_ASYNC:"GET_LIST_ASYNC",
}

export type typeActions = 
    "LOAD_REQUEST" |
    "LOAD_SUCCESS" |
    "LOAD_FAILURE";

export interface IPayload{
    data:IList[]
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
            return { ...state, loading:false, error:false, data:action.payload.data};

        case "LOAD_FAILURE": 
            return { ...state, error:true, data:[]};

        default:
            return state;
    }

}
