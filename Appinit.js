import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import TabHome from './src/navigation/Tabhome'
import AuthStack from './src/navigation/AuthStack'
import {useSelector} from 'react-redux'

const Appinit=()=>{
    const Auth=useSelector(state=>state.Auth)
    return(
        <NavigationContainer>
            {
                Auth.islogin?
                <TabHome/>
                :
                <AuthStack/>           
            }
        </NavigationContainer>
    )
}

export default Appinit;