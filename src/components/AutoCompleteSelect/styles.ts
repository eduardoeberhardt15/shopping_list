import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        width:"80%",
    },

    flatList:{
        width:"80%",
        marginTop:2,
    },

    viewInputIcon:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },

    textSearch:{
        width:"80%",
        borderColor: "black",
        borderWidth:1,
        borderRadius:8,
        padding:5,
        paddingLeft:15,
        marginRight:15,
    },

    textItem:{
        width:"100%",
        padding:5,
        paddingLeft:15,
        backgroundColor:"gray"
    },
  });

  export default styles;