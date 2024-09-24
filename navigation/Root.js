import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import routes from '../utils/routes';
import Home from '../screens/home';
import Favourites from '../screens/favourites';


const drower=createDrawerNavigator()
const Root = () => {
    return (
       <drower.Navigator screenOptions={{drawerStyle:{backgroundColor:"white",width:150}}}>
        <drower.Screen name={routes.home} component={Home}></drower.Screen>
        <drower.Screen name={routes.favourites} component={Favourites}></drower.Screen>

       </drower.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Root;
