/**
 * https://github.com/tomzaku/react-native-shimmer-placeholder
 */

import React, {useState, useEffect} from "react";
import {View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import {reducers} from "../store/reducers";
import {IList } from '../store/reducers/mainReducer';

import productsController, {products} from '../../database/controllers/products';
import listItemController from '../../database/controllers/list_item';

import styles from "./styles";
import {Container, Content, Row, Column, Input, TransparentButton, SubTitle, NormalText} from '../../styles/styled';

/*
import * as Network from 'expo-network';

const connection = await Network.getNetworkStateAsync();
      
      if(!connection.isConnected || !connection.isInternetReachable)
*/

interface StateProps{
  data:reducers,
  addTodo:(dispatch:{})=>void,
  listId:number
}
 
const AutoCompleteSelect = ({addTodo, data, listId}:StateProps) =>{ 

  const [list, setList] = useState<products[]>([]);
  const [dataList, setDataList] = useState<products[]>([]);
  const [inputText, setInputText] = useState<products & {list:number}>({id:0, name:"", list:0});
  
  const searchProductsDB = async (name:string) => {
    const list = await productsController().findByName(name);
    setDataList(list);
    setList(list);
    return true;
  } 

  async function search(text:string){

    setInputText(
      {
      id:0, 
      name:text,
      list:listId
    });

    text=text.toLowerCase();
    if(text.length===3) await searchProductsDB(text);
    if(text.length>3){
    
      const data = list.filter(l=>
        l.name.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "")
        .indexOf(text.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, ""))>=0
      );
      setDataList(data);
    }
    else if(text.length<=2){
      setDataList([]);
    }

  }

  function fillInput(id:number, text:string){

    setInputText(
      {
        id, 
        name:text,
        list:listId,
        complete:false,
      }
    );

    setDataList([]);
  }

  async function addNewTodo(){
    if(inputText.name.length>2){
      
      const id = await listItemController().insert({
        name_id:inputText.id,
        list:listId,
        price:0,
      })
      addTodo({...inputText, id});
      setInputText(
        {
          id:0, 
          name:"",
          list:listId
        }
      );
    }
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Row align="space-between">
          <Input 
            value={inputText.name}
           
            placeholder="Digite o nome do Item"
            onChangeText={text => search(text)} 
            returnKeyType="search"
            keyboardType="default"
          />
          <TouchableOpacity onPress={()=>{addNewTodo()}}>
          <Ionicons name="ios-add-circle" size={24} color="blue" />
          </TouchableOpacity>
       </Row>

       {dataList.length>0 ?
      <FlatList
                data={dataList}
                style={styles.flatList}
                keyExtractor={item=>item?.id.toString() || ""}
                /*numColumns={2}
                showsVerticalScrollIndicator={false}*/
                /*onEndReached={loadData}
                onEndReachedThreshold={0.4}
                ListFooterComponent={()=>(<ActivityIndicator size="large"/>)}*/
                renderItem={({item})=>{
                  
                    return(
                      <TouchableOpacity style={styles.textItem} 
                      onPress={()=>fillInput(item?.id, item.name)}
                      hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    
                    );
                }}
              /> : null }
    </KeyboardAvoidingView>
  );

}

const mapStateToProps = (state:reducers) =>({
  data:state
});

const mapDispatchToProps = (dispatch:Dispatch) =>({
  addTodo: (todo:any) => dispatch(actions.addTodo(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteSelect);