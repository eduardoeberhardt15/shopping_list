import React, {useState, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import * as actions from '../../store/actions';
import {InputAmount, Row} from './styles';
import { Ionicons } from '@expo/vector-icons'; 

interface Props{
    listId: number,
    itemId: number,
    amount: number,
}

const Amount:React.FC<Props> = ({itemId, listId, amount:parentAmount}) => {


    const [amount, setAmount] = useState(parentAmount);
    const dispatch = useDispatch();
    const updateTodoAmount = useCallback((values)=>{
    
        dispatch(actions.updateTodoAmount(values));
    },[]);


    const handleChangeAmount = (up:boolean) => {
        
        let newAmount=0;
        if(up) newAmount = amount+1;
        else newAmount = amount===1 ? 1 : amount-1;

        setAmount(newAmount);
        updateTodoAmount({
            id: itemId,
            list:listId,
            amount:newAmount
        });
    }
    
    return(
        <Row>
            <TouchableOpacity onPress={()=>handleChangeAmount(false)}>
                <Ionicons name="ios-remove-circle" size={24} color="rgba(0,0,0,0.5)" />
            </TouchableOpacity>
            <InputAmount>{amount}</InputAmount>
            <TouchableOpacity onPress={()=>handleChangeAmount(true)}>
                <Ionicons name="ios-add-circle" size={24} color="black" />
            </TouchableOpacity>
        </Row>
    );
}

export default Amount;