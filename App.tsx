import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import store from "./src/components/store";
import AutoCompleteSelect from './src/components/AutoCompleteSelect';
import List from './src/components/List';


export default function App() {
  return (
    
    <View style={styles.container}>
      <Provider store={store}>
      <Text>Testando</Text>
      <StatusBar style="auto" />
      <AutoCompleteSelect/>
      <List/>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:100,
    marginLeft:20,
    width:200,
    /*flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',*/
  },
});
