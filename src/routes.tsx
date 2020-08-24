import React from 'react';
import {NavigationContainer, useNavigation, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from "./components/store";

import Main from "./pages/Main";
import ListCreation from "./pages/ListCreation";
const AppStack = createStackNavigator();

export default function Routes(){

    return(
        <NavigationContainer>
            <Provider store={store}>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Main" component={Main} />
                <AppStack.Screen name="ListCreation" component={ListCreation} />
                
            </AppStack.Navigator>
            </Provider>
        </NavigationContainer>
    );
}