import React from 'react';
import { View } from 'react-native';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../components/store/actions';
import {reducers} from "../../components/store/reducers";

import styles from './styles';
import AutoCompleteSelect from '../../components/AutoCompleteSelect';
import List from '../../components/List';

interface StateProps{
    data:reducers,
    removeTodo:(dispatch:{})=>void
  }

const ListCreation = ({removeTodo, data}:StateProps) => { 
  return( 
  
    <View style={styles.container}>
      <AutoCompleteSelect/>
      <List />

    </View>
  
  );

  
}

const mapStateToProps = (state:reducers) =>({
    data:state
  });
  
  const mapDispatchToProps = (dispatch:Dispatch) =>({
    removeTodo: (todo:any) => dispatch(actions.addTodo(todo))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ListCreation);