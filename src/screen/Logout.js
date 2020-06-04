import React from 'react';
import {  View,StyleSheet } from 'react-native';
import {Button,Icon} from 'react-native-elements'
import {UserLogout} from './../redux/Action'
import {connect} from 'react-redux'

const Logout = ({
    UserLogout
}) => (
    <View style={styles.containerStyle}>
        <Button
            title='Logout'
            icon={
            <Icon
                name='log-out'
                type='entypo'
                color="tomato"
            />}
            containerStyle={{ 
                marginVertical: 15, 
                borderWidth: 0.5,
                borderColor: 'tomato',
                width: '90%'
            }}
            titleStyle={{ color: 'tomato' }}
            type='outline'
            onPress={UserLogout}
        />
    </View>
);
const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default connect(null,{UserLogout}) (Logout);
