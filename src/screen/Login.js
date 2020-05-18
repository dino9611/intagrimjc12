

import React,{useReducer} from 'react';
import {View,StyleSheet } from 'react-native';
import {Text,Icon,Input,Button} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';

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
    params,navigation
}) =>{
    const [state,dispatch]=useReducer(reducers,{email:'',password:'',passHidden:true})
    
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
            <Button
                title="Login"
                containerStyle={{ width: '95%', marginBottom: 10 }}
                buttonStyle={{ backgroundColor: 'black' }}
                loading={false}
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
