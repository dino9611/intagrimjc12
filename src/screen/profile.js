import React from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableWithoutFeedback } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { API_URL } from '../support/ApiUrl';
import {selectProfilePost} from './../redux/Action'

const Profile = ({Post,Auth,navigation,selectProfilePost}) =>{

    const OntoDetailPost=(phototerpilih)=>{
        selectProfilePost(phototerpilih)
        navigation.navigate('PostDetailProfile',{dino:phototerpilih})
    }

    const renderListPost=()=>{
        let i = 2;
        return Post.map((val,index)=>{
            let styleObj = { width: '33%', marginVertical: 1 }
            if((index + 1) === i ) {
                i += 3;
                styleObj.marginHorizontal = '0.5%'
            }
            return(
                <TouchableWithoutFeedback
                    key={index}
                    onPress={()=>OntoDetailPost(val)}
                >
                    <View 
                        style={styleObj}
                    >
                        <Image source={{uri: `${API_URL}${val.image}` }} style={{height: 125, width: '100%' }}/>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }


    return(
        <View style={styles.containerStyle} >
            <Header
                leftComponent={{
                    text:Auth.username,
                    style: { color: 'tomato', fontSize: 18, fontWeight: '700' } 
                }}
                leftContainerStyle={{ flex: 4 }}
                rightComponent={{ 
                    icon: 'menu', 
                    color: 'tomato',
                    onPress: () => navigation.toggleDrawer()
                }}
                containerStyle={{
                    backgroundColor:'#fff',
                    justifyContent: 'space-around',
                    marginTop: Platform.OS === 'ios' ? 0 : - 25,
                    borderBottomWidth: 0.5
                }}   
            />
            <ListItem
                leftAvatar={{
                    source: { uri: `${API_URL}${Auth.profileimage}` },
                    size: 'large'
                }}
                title={Auth.username}
                subtitle={`Instagrim ${Auth.role}`}
                containerStyle={{
                    width: '100%'
                }}     
            />
            <View style={{ paddingLeft: 15 }}>
                <Text>{Auth.bio}</Text>
            </View>
            <Button
                title='edit Profile'
                containerStyle={{ 
                    marginVertical: 15, 
                    marginHorizontal: 15, 
                    borderWidth: 0.5,
                    borderColor: 'tomato',
                    width: '95%'
                }}
                buttonStyle={{ borderColor: 'gray' }}
                titleStyle={{ color: 'tomato' }}
                type='outline'
            />
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1
            }}>
                {renderListPost()}
            </View>
        </View>
    );
} 

const styles=StyleSheet.create({
    containerStyle:{
        flex:1,
        backgroundColor:'#fff'
    }
})


const MapStatetoProps=({Post,Auth})=>{
    var PostforUser=Post.postList.filter((val)=>val.userId==Auth.user.id)
    // console.log(Auth.user)
    return{
        Post:PostforUser,
        Auth:Auth.user
    }
}

export default connect(MapStatetoProps,{selectProfilePost}) (Profile);
