import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        width:"90%",
  
    },

    flatList:{
        width:"85%",
        marginTop:2,
    },

    viewInputIcon:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width: "90%"
    },

    textSearch:{
        width:"90%",
        borderColor: "black",
        borderWidth:1,
        borderRadius:8,
        padding:5,
        marginRight:15,
    },

    textItem:{
        width:"100%",
        padding:5,
        paddingLeft:15,
        backgroundColor:"gray"
    },

    inputSearch:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor: "rgb(220,220,220)",
        fontSize:16
    },
    content:{
        backgroundColor:"white",
        width: "100%",
       
    },
    scroll:{
        width: "100%",
        backgroundColor:"white",
        maxHeight:130,
        flexWrap:"wrap",
        flexDirection:"column",
        overflow:"scroll",
    },
    item:{
        paddingLeft: 10,
        paddingTop:10,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    newItem:{
        fontSize:16,
        color: "rgb(0,150,0)",
    },
    text:{
        fontSize:16
    },
  });

  export default styles;