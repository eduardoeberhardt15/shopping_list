import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import {reducers} from "../store/reducers";

import styles from './styles';
import { Ionicons } from '@expo/vector-icons'; 
import { metrics } from '../../styles';

import Price from './Price';

interface StateProps{
    data:reducers,
    removeTodo:(dispatch:{})=>void,
    updateTodo:(dispatch:{})=>void,
    listId:number,
    mode:number // 0 remove, 1 complete
  }

const List = ({removeTodo, updateTodo, data, listId, mode}:StateProps) => {

    function completeTask(id:number){
       
        const item = data.reducerMain.data.find(item => item.id===id);

        updateTodo({
            id,
            list:listId,
            complete: item?.complete ? 0 : 1
        });
    }

    function removeTask(id:number){
        removeTodo({
            id,
            list:listId
        });
    }

    return (
        <FlatList
        data={data.reducerMain.data}
        style={styles.container}
        keyExtractor={item=>item.id.toString()}
        /*numColumns={2}
        showsVerticalScrollIndicator={false}*/
        /*onEndReached={loadData}
        onEndReachedThreshold={0.4}
        ListFooterComponent={()=>(<ActivityIndicator size="large"/>)}*/
        renderItem={({item})=>{
        
            return(
            <View style={styles.viewList}>
                {mode===1 ?
                    <TouchableOpacity style={{}} 
                    onPress={()=>completeTask(item.id)}
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                        <Text style={[item.complete? 
                        {textDecorationLine: 'underline line-through', 
                        textDecorationColor:"blue", 
                        textDecorationStyle:"solid"}: null, 
                        {fontSize:metrics.rem*16}]}>{item.name}</Text> 
                    </TouchableOpacity>
                :
                    <View style={{}}>
                        <Text style={{fontSize:metrics.rem*16}}>{item.name}</Text> 
                    </View>
                }
                {mode===0 ?
                    <TouchableOpacity style={{}} 
                    onPress={()=>removeTask(item.id)}
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                        <Ionicons name="ios-trash" size={18} color="black" />
                    </TouchableOpacity>
                :
                    <Price itemId={item.id} listId={listId}/>
                }
            </View>
            );
        }}
    />
    );

  
}

const mapStateToProps = (state:reducers) =>({
    data:state
  });
  
  const mapDispatchToProps = (dispatch:Dispatch) =>({
    removeTodo: (todo:any) => dispatch(actions.removeTodo(todo)),
    updateTodo: (todo:any) => dispatch(actions.updateTodo(todo)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(List);