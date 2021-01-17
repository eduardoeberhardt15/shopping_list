/**
 * https://github.com/tomzaku/react-native-shimmer-placeholder
 */

import React, {useState, useEffect, useCallback} from "react";
import {View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, Platform} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import DropDownPicker, {DropDownPickerProps} from 'react-native-dropdown-picker';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import {reducers} from "../store/reducers";
import {IList } from '../store/reducers/mainReducer';

import productsController, {products} from '../../database/controllers/products';
import listItemController from '../../database/controllers/list_item';
import categoryController from '../../database/controllers/category';

import styles from "./styles";
import {Container, Content, Row, Column, Input, metrics, colors} from '../../styles/styled';

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

  const [dataList, setDataList] = useState<products[]>([]);
  const [list, setList] = useState<products[]>([]);
  const [searchText, setSearchText] = useState("");

  async function search(text:string){

    setSearchText(text);

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
  
  const searchProductsDB = async (name:string) => {
    const l = await productsController().findByName(name)
   
    setDataList(l);
    setList(l);
    return true;
  } 

  async function addNewTodo(value:number, label:string){
      
      const id = await listItemController().insert({
        name_id:value,
        list:listId,
        price:0,
      });
     
      addTodo({id, 
        name:label,
        list:listId,
        complete:false,
      });
 
      setDataList([]);
  }

  const newProduct = async () =>{
  
    const id = await productsController().insert({name:searchText, category:11, id:0});
    addNewTodo(id, searchText);
    setSearchText("");
  }

  return(
    <View style={styles.container}>
      <View style={styles.content}>
      <TextInput 
        placeholder="Digite o produto"
        value={searchText}
        onChangeText={search}
        style={styles.inputSearch}
        returnKeyType="search"
        keyboardType="default"
      />
      <View style={{position:"relative", width: "100%"}}>
        <ScrollView style={[styles.scroll, 
          (dataList.length>0 || (dataList.length===0 && searchText.length>=3)) && {paddingBottom:10}]}>
        {dataList.map((item, index) =>
          <TouchableOpacity key={index} style={styles.item} onPress={()=>addNewTodo(item.id, item.name)}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        {(dataList.length===0 && searchText.length>=3) &&
          <TouchableOpacity style={styles.item} onPress={newProduct}>
            <Text style={styles.text}>{searchText}<Text style={styles.newItem}> - novo item</Text></Text>
          </TouchableOpacity>
        }
        </ScrollView>
      </View>
      </View>
       
    </View>
  );

}

const mapStateToProps = (state:reducers) =>({
  data:state
});

const mapDispatchToProps = (dispatch:Dispatch) =>({
  addTodo: (todo:any) => dispatch(actions.addTodo(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteSelect);