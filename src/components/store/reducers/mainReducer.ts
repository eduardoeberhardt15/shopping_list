import {Reducer} from 'redux';

interface IState{
    data:[],
    error:boolean,
    loading:boolean
}

const INITIAL_STATE:IState={

    data:[],
    error:false,
    loading:false
};

type typeActions = 
     "LOAD_REQUEST" |
    "LOAD_SUCCESS" |
    "LOAD_FAILURE";

interface IPayload{
    data:[]
}

interface IAction{
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
