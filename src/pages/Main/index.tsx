import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {format, parse} from 'date-fns';

import {Ionicons} from '@expo/vector-icons';
import styles from './styles';
import {Container, Content, Row, TransparentButton, Input, Title, SubTitle, colors} from '../../styles/styled';

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

    const navigateToListCreation = async (id:number) => {

        navigation.navigate('ListCreation',{listId: id});
        
      }

    const navigateToNewListCreation = async () => {

    /*const listId = await listController().insert();
    //init();
    navigation.navigate('ListCreation',{listId});*/
        setShowModal(true);
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
            <Header />
            <Content>

                <TransparentButton style={styles.btnCriar}
                 onPress={navigateToNewListCreation}>
                    <Ionicons name="ios-add-circle" size={48} color={colors.header} />
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

                <Modal show={showModal} setShow={setShowModal}>
                    <Input placeholder="Digite o nome da Lista" style={{width:"100%"}}/>
                </Modal>
                </Content>
        </Container>
        );
}

export default Main;