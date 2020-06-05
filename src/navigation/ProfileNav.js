import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Profile from './../screen/profile'
import PostDetailProfile from './../screen/PostDetailProfile'
import EditProfile from './../screen/editProfile'

const ProfileStack=createStackNavigator()


export default ()=>{
    return(
        <ProfileStack.Navigator
            headerMode='none'
        >
            <ProfileStack.Screen name='Profile' component={Profile}/>
            <ProfileStack.Screen name='PostDetailProfile' component={PostDetailProfile}/>
            <ProfileStack.Screen name='EditProfile' component={EditProfile}/>
        </ProfileStack.Navigator>
    )
}
