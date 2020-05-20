import React,{useReducer} from 'react';
import {View,StyleSheet } from 'react-native';
import {Text,Icon,Input,Button} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import {connect,useSelector,useDispatch} from 'react-redux'
import Axios from 'axios'
import {API_URL} from './../support/ApiUrl'
import {START_LOGIN,LOGIN_FAILED,LOGIN_USER_SUCCESS} from './../redux/types'
// import Asyncstorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-community/async-storage';
const reducers=(state,action)=>{
    switch(action.type){
        case 'Change-data':
            return {...state,[action.name]:action.payload};
        case 'Initial_State':
            return {email:'',password:'',passHidden:true}
        default:
            return state
    }
}


const Login = ({
   navigation
}) =>{
    const redDispatch=useDispatch()
    const Auth=useSelector(state=>state.Auth)
    const [state,dispatch]=useReducer(reducers,{email:'',password:'',passHidden:true})

    const onLoginpress=()=>{
        redDispatch({type:START_LOGIN})
        const {email,password}=state
        if(
            email!==''
            &&password!==''
        ){
            Axios.post(`${API_URL}/user/login`, { email, password })
            .then(async (res) => {
                try {
                    await AsyncStorage.setItem('usertoken', res.data.token);
                    redDispatch({
                        type: LOGIN_USER_SUCCESS,
                        payload: res.data
                    });
                } catch (err) {
                    redDispatch({ 
                        type: LOGIN_FAILED, 
                        payload: err.message 
                    });
                }   
            })
            .catch((err) => {
                console.log(err)
                redDispatch({ 
                    type: LOGIN_FAILED, 
                    payload: err.response.data.message 
                });
            });
        }else{
            redDispatch({type:LOGIN_FAILED,payload:'ada yang kosong'})
        }
    }
    // console.log(loadingLogin)
    return (
        <View style={styles.LogcontainerStyle}>
            <Animatable.Text animation={'fadeInDown'} duration={2000}>
                <Text h3>Instagrim</Text>
            </Animatable.Text>
            <View style={styles.LoginputStyle}>
                <Input
                    placeholder='Email'
                    leftIcon={
                        <Icon
                            name='email'
                            size={24}
                            color='black'
                        />
                    }
                    value={state.email}
                    onChangeText={(text)=>dispatch({type:'Change-data',name:'email',payload:text})}
                />
                <Input
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Icon
                            name={state.passHidden?'visibility-off':'visibility'}
                            size={24}
                            color={state.passHidden ? '#bfc3c9' : 'black'}
                            onPress={()=>dispatch({type:'Change-data',name:'passHidden',payload:!state.passHidden})}
                        />
                    }
                    value={state.password}
                    onChangeText={(text)=>dispatch({type:'Change-data',name:'password',payload:text})}
                    secureTextEntry={state.passHidden}
                />
            </View>
            <Text style={{color:'red'}}>{Auth.errorLogin}</Text>
            <Button
                title="Login"
                containerStyle={{ width: '95%', marginBottom: 10 }}
                buttonStyle={{ backgroundColor: 'black' }}
                loading={Auth.loadingLogin}
                onPress={onLoginpress}
            />
            <Button
                title="Go to Register"
                containerStyle={{ width: '95%' }}
                buttonStyle={{ borderColor: 'black', borderWidth: 1 }}
                titleStyle={{ color: 'black' }}
                type="outline"
                onPress={() => navigation.navigate('Register')}
            />
       
        </View>
    );

} 

const styles=StyleSheet.create({
    LogcontainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10
    },
    LoginputStyle: {
        marginTop: 50,
        marginBottom:60,
        width: '100%'
    }
})



export default Login;
