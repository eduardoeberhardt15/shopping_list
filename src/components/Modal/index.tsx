import React from "react";
import { Modal, StyleProp } from "react-native";

import { Container, Content, InsideContent } from "./styles";

interface Props {
  show: boolean;
  setShow: (arg: boolean) => void;
  style?: StyleProp<{ [key: string]: string }>;
}

const ModalComponent: React.FC<Props> = ({
  show,
  setShow,
  children,
  style,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={show}
      transparent={true}
      statusBarTranslucent
    >
      <Container style={style}>
        <Content onTouchEnd={() => setShow(false)}>
          <InsideContent style={{}} onTouchEnd={(e) => e.stopPropagation()}>
            {children}
          </InsideContent>
        </Content>
      </Container>
    </Modal>
  );
};

export default ModalComponent;
