import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import * as actions from '../../store/actions';
import {InputPrice} from './styles';

interface Props{
    listId: number,
    itemId: number
}

const Price:React.FC<Props> = ({itemId, listId}) => {

    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const updateTodoPrice = useCallback((values)=>{
    
        dispatch(actions.updateTodoPrice(values));
    },[]);

    const handleUpdatePrice = () => {
 
        updateTodoPrice({
            id: itemId,
            list:listId,
            price:Number(price)
        });
    }
    
    return(
        <InputPrice placeholder="R$" keyboardType="decimal-pad"
        onBlur={handleUpdatePrice}
        value={price} onChangeText={setPrice}/>
    );
}

export default Price;