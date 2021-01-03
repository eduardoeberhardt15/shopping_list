import {Platform, Dimensions} from 'react-native';

const fontRem = Dimensions.get('window').width/380;

export default {
    padding: fontRem*10,

    ...Platform.select({
        ios: {headerHeight: 64, headerPadding: 20},
        android: {headerHeight: 44, headerPadding: 0}
    }),
    tabBarHeight: 50,
    screenWidth:  Dimensions.get('window').width,
    screenHeight:  Dimensions.get('window').height,

    rem:fontRem
};