import {StyleSheet} from "react-native";
import styled from 'styled-components/native';

const styles = StyleSheet.create({
    container: {
     
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    btnCriar:{
      position: 'absolute',
      right:40,
      bottom:40
    },

    textCriar:{
      marginRight:10,
      fontSize:16
    }
});

export const ButtonView = styled.View`

  background-color: white;
  border-radius: 8px;
  align-items:center;
  justify-content:center;
  width:80%;
`;

export default styles;