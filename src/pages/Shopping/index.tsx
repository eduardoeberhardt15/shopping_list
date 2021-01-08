import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../components/store/actions';
import {reducers} from "../../components/store/reducers";

import {Bottom} from './styles';
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

const Shopping = ({removeTodo, data, getList}:StateProps) => { console.log(data);


  const route = useRoute<RouteProp<ParamList, 'Detail'>>();
  const listId = route.params.listId;
  const controller = listController();
  const [listName, setListName] = useState("Lista");
  const [listNameFocus, setListNameFocus] = useState(false);

  useEffect(()=>{
    (async ()=>{
      getList(listId);
    })();
  },[]);

  useEffect(()=>{
    (async ()=>{
      const list = await controller.findById(listId);
      setListName(list?.name || "Lista");
    })();
  },[]);


  return( 
  
    <Container>
      <Header goBack title={listName}/>
      <Content startAlign paddingTop={40}>

        <List listId={listId} mode={1}/>
        
      </Content>
      <Bottom>
          <Text>R${data.reducerMain.total.toFixed(2)}</Text>
      </Bottom>
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

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);