import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    
    },
  btn:{
    flexDirection: 'row',
    width: '100%',
    padding:15,
    marginBottom:20,
    alignItems: 'center',
    
  },
  textBtn:{
    fontSize:18,
    fontWeight:'bold',
    color:colors.logo,
    
  },
  icon:{
    color: colors.logo,
    marginHorizontal:15
  },
  header:{
    padding:30,
    width: '100%',
    backgroundColor: colors.logo,
    marginTop:Constants.statusBarHeight,
  },

  content:{
    marginTop:15,
    width: '100%',
    
  },

  avatar:{
    width: 68,
    height: 68,
    borderRadius: 34,

  },

  logo:{
    width: 68,
    height: 68,

  }
});

  export default styles;