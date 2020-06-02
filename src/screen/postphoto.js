import React from 'react';
import { View, Text, Image, ScrollView, Platform } from 'react-native';
import { Button, Input, Header, Icon } from 'react-native-elements';
import {connect} from 'react-redux'
import {OnInputCHange,onImagePostChange,postingPhoto} from './../redux/Action'
import ImagePicker from 'react-native-image-crop-picker';

class Post extends React.Component {
    state = {  }

    onBtnSelectGaleryPress=()=>{
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            console.log(image);
            this.props.onImagePostChange(image);
        }).catch(err => {
            console.log(err)
        });
    }


    onBtnOpenCameraPress=()=>{
        ImagePicker.openCamera({
            width:700,
            height:700,
            cropping:true,
            mediaType:'photo'
        }).then(image=>{
            console.log(image)
            this.props.onImagePostChange(image)
        }).catch((err)=>{
            console.log(err)
        })
    }

    onBtnPostImagePress=()=>{
        this.props.postingPhoto(this.props)
    }

    render() {
        return (
            <View style={{flex:1}}> 
                <Header
                    leftComponent={
                        {
                            text:'Select Image',
                            style:{color:'tomato', fontSize:18,fontWeight:'bold'}
                        }
                    }
                    leftContainerStyle={{ flex: 3 }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25,
                        elevation: 2
                    }}              
                />
                <ScrollView>
                    <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                        <Button
                            icon={
                                <Icon
                                    name="photo-library"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Select from Gallery"
                            onPress={this.onBtnSelectGaleryPress}
                            containerStyle={{ marginBottom : 15 }}
                            buttonStyle={{ backgroundColor: 'tomato' }}
                        />
                        <Button
                            icon={
                                <Icon
                                    name="photo-camera"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Open Camera"
                            onPress={this.onBtnOpenCameraPress}
                            buttonStyle={{ backgroundColor: 'tomato' }}
                        />
                        <Input
                            placeholder='Caption...'
                            value={this.props.caption}
                            onChangeText={(text)=>this.props.OnInputCHange(text)}
                        />
                    </View>
                    <View 
                        style={{ 
                            marginHorizontal: 10, 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        <Image 
                            source={{ uri: this.props.image ? this.props.image.path : null }} 
                            style={{ height: 350, width: '100%' }} 
                        />
                    </View>
                    <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                        <Text style={{ color: 'red' }}>{this.props.error}</Text>
                        <Button
                            icon={
                                <Icon
                                    name="cloud-upload"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Post Image"
                            buttonStyle={{ backgroundColor: 'tomato' }}
                            onPress={this.onBtnPostImagePress}
                            loading={this.props.loading}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const MapstatetoProps=({PostPhoto,Auth})=>{
    return{
        ...PostPhoto,
        userid:Auth.user.id
    }
}

export default connect(MapstatetoProps,{
    OnInputCHange,
    onImagePostChange,
    postingPhoto
}) (Post);
