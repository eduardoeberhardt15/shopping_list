import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {format, parse} from 'date-fns';

import {Ionicons} from '@expo/vector-icons';
import styles from './styles';
import {Container, Content, Row, Column, TransparentButton, Title, SubTitle, NormalText} from '../../styles/styled';

import migrations from '../../database/migrations';
import productsController from '../../database/controllers/products';
import listController, {list} from '../../database/controllers/list';
import listItemController from '../../database/controllers/list_item';

const Main: React.FC = () => {

    const navigation = useNavigation();
    const [list, setList] = useState<list[]>([]);

    const navigateToListCreation = async (id:number) => {

        navigation.navigate('ListCreation',{listId: id});
        
      }

    const navigateToNewListCreation = async () => {

    const listId = await listController().insert();
    //init();
    navigation.navigate('ListCreation',{listId});
    
    }

    useEffect(()=>{
        (async () =>{
          // await migrations().reset();
           
        })()
    },[]);

    useFocusEffect(
        React.useCallback(() => {
            init();
        },[])
      );

    const init = async () => {
        
        const list = await listController().getAllOpen();
        setList(list);
       
        }

    return( 
        <Container>
            <StatusBar style="auto" />
            <Content>
                
                <TransparentButton style={{paddingVertical:40}}
                 onPress={navigateToNewListCreation}>
                    <Title >Criar Lista de Compras</Title>
                    <Ionicons name="ios-add-circle" size={36} color="blue" />
                </TransparentButton>

                {list.map((list, index) =>
                    <TransparentButton style={{paddingVertical:5}}
                     onPress={()=>navigateToListCreation(list.id)} key={index}>
                         <Row>
                            <SubTitle>{`${list.name || "Lista"} - `}</SubTitle>
                            <SubTitle>{format(new Date(list.date), 'dd/MMM HH:mm')}</SubTitle>
                         </Row>
                        
                    </TransparentButton>
                )}
                </Content>
        </Container>
        );
}

export default Main;