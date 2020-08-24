/**
 * https://github.com/tomzaku/react-native-shimmer-placeholder
 */

import React, {useState} from "react";
import {View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import {reducers} from "../store/reducers";
import {IList } from '../store/reducers/mainReducer';

import styles from "./styles";

/*
import * as Network from 'expo-network';

const connection = await Network.getNetworkStateAsync();
      
      if(!connection.isConnected || !connection.isInternetReachable)
*/

 
const list:IList[] = [
  {id:1, text:"Brasil"},
  {id:2, text:"EUA"},
  {id:3, text:"Mexico"},
  {id:4, text:"Canada"},
  {id:5, text:"Alemanha"},
  {id:6, text:"Espanha"},
  {id:7, text:"Argentina"},
  {id:8, text:"Colombia"},
  {id:9, text:"Chile"},
  {id:10, text:"Italia"},
  {id:11, text:"Portugal"},
  {id:12, text:"Usa"},
  {id:13, text:"Estados Unidos"},

];

interface StateProps{
  data:reducers,
  addTodo:(dispatch:{})=>void
}
 
const AutoCompleteSelect = ({addTodo, data}:StateProps) =>{ 

  const [dataList, setDataList] = useState<IList[]>([]);
  const [inputText, setInputText] = useState<IList>({id:0, text:""});

  function loadData(){

  }

  function search(text:string){

    setInputText(
      {
      id:0, 
      text
    });

    text=text.toLowerCase();
    if(text.length>2){
    
      const data = list.filter(l=>l.text.toLowerCase().indexOf(text)>=0);
      setDataList(data);
    }
    else{
      setDataList([]);
    }

  }

  function fillInput(id:number, text:string){

    setInputText(
      {
        id, 
        text,
        complete:false,
      }
    );

    setDataList([]);
  }

  function addNewTodo(){
    if(inputText.text.length>2){
      addTodo(inputText);

      setInputText(
        {
          id:0, 
          text:"",
        }
      );
    }
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.viewInputIcon}>
          <TextInput 
            value={inputText.text}
            style={styles.textSearch} 
            placeholder="Search"
            onChangeText={text => search(text)} 
            returnKeyType="search"
            keyboardType="default"
          />
          <TouchableOpacity onPress={()=>{addNewTodo()}}>
          <Ionicons name="ios-add-circle" size={24} color="blue" />
          </TouchableOpacity>
       </View>

       {dataList.length>0 ?
      <FlatList
                data={dataList}
                style={styles.flatList}
                keyExtractor={item=>item.id.toString()}
                /*numColumns={2}
                showsVerticalScrollIndicator={false}*/
                /*onEndReached={loadData}
                onEndReachedThreshold={0.4}
                ListFooterComponent={()=>(<ActivityIndicator size="large"/>)}*/
                renderItem={({item})=>{
                  
                    return(
                      <TouchableOpacity style={styles.textItem} 
                      onPress={()=>fillInput(item.id, item.text)}
                      hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                        <Text>{item.text}</Text>
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