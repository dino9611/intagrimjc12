import React,{useState,useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import DrawerNav from './src/navigation/drawerNav'
import AuthStack from './src/navigation/AuthStack'
import {connect} from 'react-redux'
import {View,StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable';
import {Text} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import {API_URL} from './src/support/ApiUrl'
import {alreadyLogin,NotloginYet} from './src/redux/Action'




const Appinit=(props)=>{

    const [loading,setloading]=useState(true)

    const fechdata= async()=>{
        try {
            const token=await AsyncStorage.getItem('usertoken')
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            Axios.post(`${API_URL}/user/keeplogin`, null, options)
            .then((res) => {
                props.alreadyLogin(res.data);
            }).catch((err) => {
                props.NotLoginYet();
            }).finally(()=>{
                setloading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fechdata()
    },[])

    if(loading){
        return(
        <View style={styles.LogcontainerStyle}>
            <Animatable.Text animation={'bounce'} iterationCount="infinite">
                <Text h3>Instagrim...</Text>
            </Animatable.Text>
        </View>
        )
    }


    // const Auth=useSelector(state=>state.Auth)
    return(
        <NavigationContainer>
            {
                props.Auth.islogin?
                <DrawerNav/>
                :
                <AuthStack/>           
            }
        </NavigationContainer>
    )
}


const styles=StyleSheet.create({
    LogcontainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10
    }
})


const MapStateToProps=(state)=>{
    return{
        Auth:state.Auth,
        error:state.Auth.errorRegister
    }
}
export default connect(MapStateToProps,{NotloginYet,alreadyLogin}) (Appinit);