import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';

import {Ionicons} from '@expo/vector-icons';
import styles from './styles';

import migrations from '../../database/migrations';
import productsController from '../../database/controllers/products';
import listController from '../../database/controllers/list';
import listItemController from '../../database/controllers/list_item';

const Main: React.FC = () => {

    const navigation = useNavigation();

    function navigateToListCreation(){
        navigation.navigate('ListCreation',{osId:""});
        
      }

    useEffect(()=>{
       init();
        
    },[]);

    const init = async () => {
        await migrations().init();
        
        //const controller = await productsController().insert({name:"Banana", category:"Fruta"});
       //console.log(controller);
        //await listController().insert();
        //const controller1 = await listItemController().insert({name:1, price:4.10, list:1})
        /*const controller2 = await listItemController().findByListId(1);
        console.log(controller2);
        const controller3 = await productsController().getAll();
        console.log(controller3);
        */
        }

    return( 
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.btnCriar}
            onPress={()=>navigateToListCreation()}>
                <Text style={styles.textCriar}>Criar Lista de Compras</Text>
                <Ionicons name="ios-add-circle" size={24} color="blue" />
            </TouchableOpacity>
          
        </View>
        );
}

export default Main;