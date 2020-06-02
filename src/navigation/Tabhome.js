import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './../screen/home'
import Explore from './../screen/explore'
import Like from './../screen/like'
import Post from './../screen/postphoto'
import Post2 from './../screen/postphoto2'
import Profile from './../screen/profile'
import Profile2 from './../screen/profile2'
import EditProfile2 from './../screen/editprofile2'
import { Icon } from 'react-native-elements';

const Tab=createBottomTabNavigator()

export default ()=>{
    return(
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({route})=>({
                tabBarIcon:({focused,color,size})=>{
                    let iconName;
                    let sizes=size;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                        sizes=focused?30:size
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'account-box' : 'account-box';
                        sizes=focused?30:size
                    }else if(route.name==='Explore'){
                        iconName=focused?'search':'search'
                        sizes=focused?30:size
                    }else if(route.name==='Like'){
                        iconName=focused?'md-heart-half':'md-heart-half'  
                        sizes=focused?30:size
                        return <Icon name={iconName} size={sizes} type='ionicon' color={color} />;
                    }else{
                        iconName=focused?'add-box':'add-box'
                        sizes=focused?30:size
                    }
        
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={sizes}  color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: 'salmon',
                inactiveTintColor: 'gray',
                showLabel:false
            }}
        >
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Explore' component={Explore}/>
            <Tab.Screen name='Post' component={Post}/>
            <Tab.Screen name='Like' component={EditProfile2}/>
            <Tab.Screen name='Profile' component={Profile2}/>
        </Tab.Navigator>
    )
}