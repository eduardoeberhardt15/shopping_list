import React from 'react';
import { Modal } from 'react-native';

import {Container, Content, InsideContent} from './styles';

interface Props{
    show: boolean,
    setShow: (arg: boolean)=>void
}

const ModalComponent:React.FC<Props> =  ({show, setShow, children}) => {

    return(
    <Modal animationType="slide" visible={show} transparent={true} statusBarTranslucent>
        <Container style={{backgroundColor:"transparent"}}>
            <Content onTouchEnd={()=>setShow(false)}>
                <InsideContent style={{}} onTouchEnd={e=>e.stopPropagation()}>
                    {children}
                </InsideContent>
            </Content>
        </Container>
         
    </Modal>
    );
}

export default ModalComponent