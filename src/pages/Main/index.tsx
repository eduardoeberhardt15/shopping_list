import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';

import {Ionicons} from '@expo/vector-icons';
import styles from './styles';

import migrations from '../../database/migrations';

const Main: React.FC = () => {

    const navigation = useNavigation();

    function navigateToListCreation(){
        navigation.navigate('ListCreation',{osId:""});
        
      }

    useEffect(()=>{
       
        migrations();
    },[]);

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