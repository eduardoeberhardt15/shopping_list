import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../components/store/actions';
import {reducers} from "../../components/store/reducers";

import styles from './styles';
import {Container, Content, Row, Column, Input, TransparentButton, SubTitle, NormalText} from '../../styles/styled';
import Header from '../../components/Header';
import AutoCompleteSelect from '../../components/AutoCompleteSelect';
import List from '../../components/List';

import listController, {list} from '../../database/controllers/list';
import listItemController from '../../database/controllers/list_item';

interface StateProps{
    data:reducers,
    removeTodo:(dispatch:{})=>void,
    getList:(dispatch:{})=>void
  }

type ParamList = {
  Detail: {
    listId:number,
  };
};

const ListCreation = ({removeTodo, data, getList}:StateProps) => { 

  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const listId = route.params.listId;
  const controller = listController();
  const [listName, setListName] = useState("");
  const [listNameFocus, setListNameFocus] = useState(false);

  useEffect(()=>{
    (async ()=>{
      getList(listId);
    })();
  },[]);

  useEffect(()=>{
    (async ()=>{
      const list = await controller.findById(listId);
      setListName(list?.name || "");
    })();
  },[]);

  const changeListName = () => {
    controller.update({id:listId, name:listName});
    setListNameFocus(false);
  }

  return( 
  
    <Container>
      <Header />
      <Content>

        <Input 
          placeholder="Editar nome da Lista"
          value={listName}
          onChangeText={text => setListName(text)}
          onBlur={changeListName}
          onFocus={()=>setListNameFocus(true)}
          style={!listNameFocus && {borderColor:"transparent"}}
        />
        <AutoCompleteSelect listId={listId}/>
        <List listId={listId}/>
        
      </Content>
    </Container>
  
  );

  
}

const mapStateToProps = (state:reducers) =>({
    data:state
  });
  
  const mapDispatchToProps = (dispatch:Dispatch) =>({
    removeTodo: (todo:any) => dispatch(actions.addTodo(todo)),
    getList: (listId:number) => dispatch(actions.getList(listId))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ListCreation);