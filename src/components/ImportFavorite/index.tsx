import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addTodo} from 'components/store/actions';
import {reducers} from "components/store/reducers";
import {IState} from "components/store/reducers/mainReducer";

import {Container} from './styles';
import {NormalText, TransparentButton} from 'styles/styled';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import controller from 'database/controllers/products';
import listItemController from 'database/controllers/list_item';

interface Props{
    listId:number
}

const ImportFavorite:React.FC<Props> = ({listId}) => {
    
    const dispatch = useDispatch();
    const addItem = useCallback(values=>{
        dispatch(addTodo(values))
    },[dispatch]);

    const state = useSelector<reducers, IState>(state => state.reducerMain);
    

    const handleImport = async() =>{
        const {data} = state;
        const favorite = await controller().getFavorite();
        const addAll = await favorite.map(async item => {
        if(!data.find(l => l.productId===item.id)){
            const id = await listItemController().insert({
                name_id:item.id,
                list:listId,
                price:0,
              });
            return new Promise(resolve => {       
                addItem({id, name:item.name, list:listId, favorite: true}); 
                resolve(true);
            })
        }});
       
        Promise.all(addAll);
        
    }

    return(
    <Container>
        <TransparentButton onPress={handleImport}>
            <NormalText color="blue" style={{opacity:0.5}}>Importar Favoritos</NormalText>
            <MaterialCommunityIcons name="import" size={24} color="blue" />
        </TransparentButton>
    </Container>
    );
}

export default ImportFavorite;