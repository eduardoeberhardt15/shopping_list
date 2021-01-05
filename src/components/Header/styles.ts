import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {colors} from '../../styles';

const styles = StyleSheet.create({
  container: {
   
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.logo,
    width: '100%',
    height: 60,
    marginTop:Constants.statusBarHeight,
    },
    icon:{
        marginRight:20,
    },
    text:{
      fontSize:16,
      color: 'rgba(255,255,255,.7)',
    },
    active:{
      color: 'white',
      fontWeight: 'bold',
    }
 
});

  export default styles;