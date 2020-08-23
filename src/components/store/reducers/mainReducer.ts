import {Reducer} from 'redux';

export interface IState{
    data:string[],
    error:boolean,
    loading:boolean
}

const INITIAL_STATE:IState={

    data:["123"],
    error:false,
    loading:false
};


export const Types={
    LOAD_REQUEST:"LOAD_REQUEST",
    LOAD_SUCCESS:"LOAD_SUCCESS",
    LOAD_FAILURE:"LOAD_FAILURE",
    ADD_TODO:"ADD_TODO",
}

export type typeActions = 
    "LOAD_REQUEST" |
    "LOAD_SUCCESS" |
    "LOAD_FAILURE";

export interface IPayload{
    data:[]
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
