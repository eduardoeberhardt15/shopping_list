import React, { useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import styles from './styles';
import {Ionicons} from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../styles';

export interface IMessage{
    show:boolean,
    title:string,
    message?:string,
    fReturn?:() => void | Promise<void>,
    fCancel?:() => void | Promise<void>,
    showCancelButton?:boolean,
    showConfirmButton?:boolean,
    confirmText?: string,
    cancelText?: string,
    timer?: number,
}
interface IProps{

    title?:string,
    message?:IMessage,
    goBack?: boolean
}

export interface IRef{
    active:boolean
}

 const Header:React.ForwardRefRenderFunction<IRef, IProps> = ({title, message, goBack}, ref) =>{

    const navigation = useNavigation();
    const [active, setActive] = useState(true);
    const [show, setShow] = useState(false);
    
    useImperativeHandle(ref, ()=>({
        active,
    }));

    function handleOpenDrawer(){
        navigation.openDrawer();
    }


    useEffect(()=>{
        if(message?.show)setShow(true);
        if(message?.timer) setTimeout(()=>{setShow(false)},message.timer);
        
    },[message]);

    useEffect(()=>{
        if(goBack){
            
            navigation.addListener('beforeRemove', (e) => { 
                e.preventDefault();
            
                
        })};
    },[]);

    const goToBackScreen = () => {
        
        navigation.removeListener('beforeRemove', (e) => { 
            e.preventDefault();
        });

        const action = CommonActions.reset({
            index: 0,
            key: null, 
            routes: [{name: navigation.dangerouslyGetState().routes[0].name}]
          });
          navigation.dispatch(action);
    }

    return(
        <View style={[styles.container, goBack && {justifyContent:"space-between"}]}>
            <StatusBar style="auto" backgroundColor={colors.header} />
            <AwesomeAlert
                show={show}
                
                title={message?.title || ""}
                message={message?.message || ""}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={message?.showCancelButton || false}
                showConfirmButton={message?.showConfirmButton || false}
                cancelText={message?.cancelText || "Não, cancelar"}
                confirmText={message?.confirmText || "OK"}
                confirmButtonColor="#3643f8"
                onCancelPressed={() => {
                    setShow(false);
                    if(message?.fCancel)
                        message.fCancel();
                }}
                onConfirmPressed={() => {
                    setShow(false);
                    if(message?.fReturn)
                        message.fReturn();
                }}
            />
            

            {goBack &&
            <TouchableOpacity onPress={goToBackScreen}>
                <Ionicons size={36} name='ios-arrow-round-back' color='white' 
                style={[styles.icon, {paddingLeft:10}]}/>
            </TouchableOpacity>
            }
            
            {title &&
            <Text style={styles.text}>{title}</Text>
            }           

            <TouchableOpacity onPress={handleOpenDrawer}>
           <Ionicons size={36} name='ios-menu' color='white' style={styles.icon}/>
           </TouchableOpacity>
      </View>
    );
}

export default forwardRef(Header);
