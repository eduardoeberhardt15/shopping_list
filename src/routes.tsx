import React from 'react';
import {NavigationContainer, useNavigation, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import store from "./components/store";

import DragMenu from './pages/DragMenu';
import Main from "./pages/Main";
import ListCreation from "./pages/ListCreation";
import Shopping from './pages/Shopping';

const AppStack = createStackNavigator();

const Drawer = createDrawerNavigator();


export default function Routes(){

    return(
        <NavigationContainer>
            <Provider store={store}>
                <Drawer.Navigator drawerContent={DragMenu}>
            
                    <Drawer.Screen name="Main" component={Main} />
                    <Drawer.Screen name="ListCreation" component={ListCreation} options={{unmountOnBlur:true}}/>
                    <Drawer.Screen name="Shopping" component={Shopping} options={{unmountOnBlur:true}}/>
                    
                </Drawer.Navigator>
            </Provider>
        </NavigationContainer>
    );
}