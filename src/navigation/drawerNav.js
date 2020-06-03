import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Tabnav from './Tabhome'
import Logout from './../screen/Logout'
import { Icon } from 'react-native-elements';

const Drawernav=createDrawerNavigator()

export default ()=>{
    return(
        <Drawernav.Navigator
            initialRouteName='Tabnav'
            drawerPosition='right'
            drawerType='slide'
            drawerStyle={{
                backgroundColor: '#fff',
                borderColor: '#cfcfcf',
                borderWidth: 1
             }}
            overlayColor={0}
            drawerContentOptions={{
                activeTintColor: 'black',
                activeBackgroundColor: '#fff',
                justifyContent: 'flex-end'
            }}
        >
            <Drawernav.Screen name='Tabnav' component={Tabnav}
                options={{
                    drawerLabel: () => null,
                    swipeEnabled:false
                }}
            />
            <Drawernav.Screen name='Logout' component={Logout}
                   options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon name={'cog'} type='font-awesome' size={25} color={tintColor} />
                    ),
                    // gestureEnabled: false
                }}
            />
        </Drawernav.Navigator>
    )
}
