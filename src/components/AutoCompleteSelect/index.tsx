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

import styles from "./styles";

/*
import * as Network from 'expo-network';

const connection = await Network.getNetworkStateAsync();
      
      if(!connection.isConnected || !connection.isInternetReachable)
*/


 interface IList{
   id: number,
   value:string
 }
 
const list:IList[] = [
  {id:1, value:"Brasil"},
  {id:2, value:"EUA"},
  {id:3, value:"Mexico"},
  {id:4, value:"Canada"},
  {id:5, value:"Alemanha"},
  {id:6, value:"Espanha"},
  {id:7, value:"Argentina"},
  {id:8, value:"Colombia"},
  {id:9, value:"Chile"},
  {id:10, value:"Italia"},
  {id:11, value:"Portugal"},
  {id:12, value:"Usa"},
  {id:13, value:"Estados Unidos"},

];

interface StateProps{
  data:reducers,
  addTodo:(dispatch:{})=>void
}
 
const AutoCompleteSelect = ({addTodo, data}:StateProps) =>{ 

  const [dataList, setDataList] = useState<IList[]>([]);
  const [inputText, setInputText] = useState("");

  function loadData(){

  }

  function search(text:string){

    setInputText(text);

    text=text.toLowerCase();
    if(text.length>2){
    
      const data = list.filter(l=>l.value.toLowerCase().indexOf(text)>=0);
      setDataList(data);
    }
    else{
      setDataList([]);
    }

  }

  function fillInput(text:string){

    setInputText(text);
    setDataList([]);
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.viewInputIcon}>
          <TextInput 
            value={inputText}
            style={styles.textSearch} 
            placeholder="Search"
            onChangeText={text => search(text)} 
            returnKeyType="search"
            keyboardType="default"
          />
          <TouchableOpacity onPress={()=>{addTodo("ok")}}>
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
                      onPress={()=>fillInput(item.value)}
                      hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                        <Text>{item.value}</Text>
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