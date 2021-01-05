import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {DrawerContentComponentProps} from "@react-navigation/drawer";

import {Ionicons} from '@expo/vector-icons';
import styles from './styles';

//import logo from "../../assets/logo.png";
import { Row, Title } from '../../styles/styled';

const DragMenu:React.FC<DrawerContentComponentProps> = ({navigation}) =>{

    //const navigation = useNavigation();

    function navigateToAbout(){
        navigation.navigate('About');
        
      }
      function navigateToHowUse(){
        navigation.navigate('HowUse');
        
      }

      function navigateToSearch(){
        navigation.navigate('Search');
        
      }

      function navigateToLogin(){
        navigation.navigate('Login');
        
      }
      
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Row>
                  {/*<Image style={styles.logo} source={logo} resizeMode="contain"></Image>*/}
                  <Title color={"white"} style={{marginLeft:5, fontSize:19}}>Compra Compartilhada</Title>
                </Row>
            </View>
            <View style={styles.content}>
            <TouchableOpacity style={styles.btn} onPress={navigateToAbout}>
                <Ionicons size={36} name='ios-home' color='white' style={styles.icon}/>
                <Text style={styles.textBtn}>Compra Compartilhada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={navigateToHowUse}>
                <Ionicons size={36} name='ios-create' color='white' style={styles.icon}/>
                <Text style={styles.textBtn}>Como Usar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={navigateToSearch}>
                <Ionicons size={36} name='ios-search' color='white' style={styles.icon}/>
                <Text style={styles.textBtn}>blablab</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={navigateToLogin}>
                 <Ionicons size={36} name='ios-log-in' style={styles.icon}/>
                <Text style={styles.textBtn}>Logar</Text>
            </TouchableOpacity>
            </View>
      </View>
    );
}

export default DragMenu;

