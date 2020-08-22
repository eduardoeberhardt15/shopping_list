import React , {useRef} from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';

import {reducers} from "../store/reducers";
import {IState} from "../store/reducers/mainReducer";
import * as actions from '../store/actions';

import './styles.css';

interface StateProps{
    data:reducers,
    addTodo:(dispatch:{})=>void
}


function Todo({addTodo, data}:StateProps) {

    const datas:IState = data.reducerMain;

    const inputRef = useRef<HTMLInputElement>(null);

    function handleEnterKey(key:String):void{
        if(key==="Enter"){
            if(inputRef.current?.value!=null && inputRef.current?.value!==""){
                addTodo(inputRef.current?.value);
                inputRef.current.value="";
            }
                
        }
    }

  return( 
    <div className="divTodo">

        <h2>Todo List</h2>

        <input type="text" 
        ref={inputRef}
        onKeyPress={(e)=>handleEnterKey(e.key)}/>
        {!datas.loading && !datas.error?
        <ul>
            {datas.data.map((value, index)=>(
                <li key={index}>{value}</li>
            ))}
        </ul>
        : null }
    </div>
  );
}

const mapStateToProps = (state:reducers) =>({
    data: state
});

const mapDispatchToProps = (dispatch:Dispatch) =>({
    addTodo: (todo:any) => dispatch(actions.addTodo(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);