import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './../screen/Login'
import Register from './../screen/Register'

const AuthStack =createStackNavigator()

export default ()=>{
    return(
        <AuthStack.Navigator headerMode='none'>
            <AuthStack.Screen name='Login' component={Login}/>
            <AuthStack.Screen name='Register' component={Register}/>
        </AuthStack.Navigator>
    )
}
