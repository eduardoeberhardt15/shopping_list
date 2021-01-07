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

  const [dataList, setDataList] = useState<{label:string, value:number}[]>([]);
  const [inputText, setInputText] = useState<products & {list:number}>({id:0, name:"", list:0});
  const [dropOpen, setDropOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<{label:string, value:number}[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const [product, setProduct] = useState<number | null>(null);

  let dropDownController1, dropDownController2;

  useEffect(()=>{
    (async () => {
      const c = await categoryController().getAll();
      const l = c.map(list => {
        return {
          label: list.name,
          value: list.id
        }
      });
      setCategoryList(l);
    })();
    
  },[]);

  useEffect(()=>{
    dropDownController1?.reset();
    dropDownController2?.open();
  },[dataList]);
  
  const searchProductsDB = async (category:number) => {
    const list = await productsController().findByCategory(category);
    const l = list.map(list => {
      return {
       
        label: list.name,
        value: list.id
      }
    });
    setDataList(l);
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
      dropDownController2?.reset();
      setDataList([]);
      //setTimeout(()=>{dropDownController1?.reset();},2000)
  }

  const handleSelected = (value:number) => {
    setCategory(value);
    searchProductsDB(value);
  }

  const handleSetSelected = (value:number, label:string) => {
    
    addNewTodo(value, label);
    setProduct(value);
  }

  return(
    <View style={styles.container}>
      
       {dataList.length===0 ?
       <DropDownPicker
          items={[
              
            ...categoryList
          ]}
          defaultValue={category}
          containerStyle={{height: 50}}
          style={[{backgroundColor: '#fafafa', width:"100%", marginTop:9}, dropOpen && {display:"none"}]}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa', width:"100%", minHeight:200}}
          onChangeItem={item => handleSelected(item.value)}
          onOpen={()=>setDropOpen(true)}
          onClose={()=>setDropOpen(false)}
          searchable
          searchablePlaceholder="Digite a categoria"
          placeholder="Selecione a Categoria"
          searchableError={() => <Text>Categoria Inexistente</Text>}
          controller={instance => dropDownController1 = instance}
        />
        :
        <DropDownPicker
          items={[
              
            ...dataList
          ]}
          defaultValue={product}
          containerStyle={{height: 50}}
          style={[{backgroundColor: '#fafafa', width:"100%", marginTop:9}]}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa', width:"100%", minHeight:200}}
          onChangeItem={item => handleSetSelected(item.value, item.label)}
          onOpen={()=>setDropOpen(true)}
          onClose={()=>setDropOpen(false)}
          searchable
          searchablePlaceholder="Digite o produto"
          placeholder="Agora selecione o produto"
          searchableError={() => <Text>Produto Inexistente</Text>}
          controller={instance => dropDownController2 = instance}
          
        />
        }
       
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