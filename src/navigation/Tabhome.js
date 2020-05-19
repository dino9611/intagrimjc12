import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './../screen/home'

const Tab=createBottomTabNavigator()

export default ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}/>
        </Tab.Navigator>
    )
}