import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {format, parse} from 'date-fns';

import {Ionicons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import styles, {ButtonView} from './styles';
import {Container, Content, Row, TransparentButton, Input, Button, TextButton, Title, SubTitle, colors, metrics} from '../../styles/styled';

import Header from '../../components/Header';
import Modal from '../../components/Modal';

import migrations from '../../database/migrations';
import productsController from '../../database/controllers/products';
import listController, {list} from '../../database/controllers/list';
import listItemController from '../../database/controllers/list_item';

const Main: React.FC = () => {

    const navigation = useNavigation();
    const [list, setList] = useState<list[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [listName, setListName] = useState("");

    const navigateToListCreation = async (id:number, action:number) => {

        if(action===0)
            navigation.navigate('ListCreation',{listId: id});
        else navigation.navigate('Shopping',{listId: id});
        
      }

    const navigateToNewListCreation = async () => {

    const listId = await listController().insert(listName);
    //init();
    navigation.navigate('ListCreation',{listId});
        setShowModal(false);
    }

    useEffect(()=>{
        (async () =>{
          //await migrations().reset();
           
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
            <Header />
            <Content>

                {list.length===0 &&
                <Title>Adicione uma lista de compras</Title>}

                <TransparentButton style={styles.btnCriar}
                 onPress={()=>setShowModal(true)}>
                    <Ionicons name="ios-add-circle" size={metrics.rem*64} color={colors.header} />
                </TransparentButton>

                {list.map((list, index) =>
                    <ButtonView style={{paddingVertical:5}}
                      key={index}>
                         <Row>
                            <SubTitle>{`${list.name || "Lista"} - `}</SubTitle>
                            <SubTitle>{format(new Date(list.date), 'dd/MMM HH:mm')}</SubTitle>
                         </Row>
                         <Row align="space-around">
                             <TransparentButton onPress={()=>navigateToListCreation(list.id, 0)}>
                                <AntDesign name="edit" size={metrics.rem*36} color={colors.header} />
                            </TransparentButton>
                            <TransparentButton onPress={()=>navigateToListCreation(list.id, 1)}>
                                <Ionicons name="ios-cart" size={metrics.rem*36} color={colors.header} />
                            </TransparentButton>
                         </Row>
                        
                    </ButtonView>
                )}

                <Modal show={showModal} setShow={setShowModal}>
                    <Input placeholder="Digite o nome da Lista" style={{width:"100%"}}
                        value={listName} onChangeText={setListName}/>
                    <Button onPress={navigateToNewListCreation} style={{width:"100%"}}>
                        <TextButton>Criar</TextButton>
                    </Button>
                </Modal>
                </Content>
        </Container>
        );
}

export default Main;