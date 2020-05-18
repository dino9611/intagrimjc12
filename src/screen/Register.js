import React,{useState,useReducer} from 'react';
import { View,StyleSheet } from 'react-native';
import {Text,Icon,Input,Button} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';

const reducers=(state,action)=>{
    switch(action.type){
        case 'Change-data':
            return {...state,[action.name]:action.payload};
        case 'Initial_State':
            return {email:'',username:'',password:'',conpassword:''}
        default:
            return state
    }
}


const Register = ({
    params,navigation
}) =>{
    const [state,dispatch]=useReducer(reducers,{email:'',username:'',password:'',conpassword:''})
    const [passHidden,setpassHidden]=useState(true)
    const [conpassHidden,setconpassHidden]=useState(true)

    return (
        <View style={styles.LogcontainerStyle}>
            <Animatable.Text animation={'fadeInDown'} duration={2000}>
                <Text h3>Register</Text>
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
                    placeholder='Username'
                    leftIcon={
                        <Icon
                            name='account-box'
                            size={24}
                            color='black'
                        />
                    }
                    value={state.username}
                    onChangeText={(text)=>dispatch({type:'Change-data',name:'username',payload:text})}
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
                            name={passHidden?'visibility-off':'visibility'}
                            size={24}
                            color={passHidden ? '#bfc3c9' : 'black'}
                            onPress={()=>setpassHidden(!passHidden)}
                        />
                    }
                    value={state.password}
                    onChangeText={(text)=>dispatch({type:'Change-data',name:'password',payload:text})}
                    secureTextEntry={passHidden}
                />
                <Input
                    placeholder='Confirm Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Icon
                            name={conpassHidden?'visibility-off':'visibility'}
                            size={24}
                            color={conpassHidden ? '#bfc3c9' : 'black'}
                            onPress={()=>setconpassHidden(!conpassHidden)}
                        />
                    }
                    secureTextEntry={conpassHidden}
                    value={state.conpassword}
                    onChangeText={(text)=>dispatch({type:'Change-data',name:'conpassword',payload:text})}
                />
            </View>
            <Button
                title="Register"
                containerStyle={{ width: '95%', marginBottom: 10 }}
                buttonStyle={{ backgroundColor: 'black' }}
                // onPress={onBtnRegisterPress}
                loading={false}
            />
            <Button
                title="Back to Login"
                containerStyle={{ width: '95%' }}
                buttonStyle={{ borderColor: 'black', borderWidth: 1 }}
                titleStyle={{ color: 'black' }}
                type="outline"
                onPress={() => navigation.goBack()}
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
        marginBottom:70,
        width: '100%'
    }
})
export default Register;
