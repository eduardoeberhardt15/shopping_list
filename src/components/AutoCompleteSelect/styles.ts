import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {/*
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',*/
    },

    flatList:{
        width:"100%",
        marginTop:2,
    },

    viewInputIcon:{
        flexDirection:"row",
        alignItems:"center",
    },

    textSearch:{
        width:"80%",
        borderColor: "black",
        borderWidth:1,
        borderRadius:8,
        padding:5,
        paddingLeft:15,
        marginRight:5,
    },

    textItem:{
        width:"100%",
        padding:5,
        paddingLeft:15,
        backgroundColor:"gray"
    },
  });

  export default styles;