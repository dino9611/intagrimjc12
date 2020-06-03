import React from 'react';
import { View, Text, Image, ScrollView, Platform } from 'react-native';
import { Button, Input, Header, Icon } from 'react-native-elements';
import {connect} from 'react-redux'
import {OnInputCHange,onImagePostChange,postingPhoto} from './../redux/Action'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {API_URL} from './../support/ApiUrl'
class Post extends React.Component {
    state = {
        error:'',
        loading:false,
        image:null,
        caption : '', 

      }

    onBtnSelectGaleryPress=()=>{
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            console.log(image);
            this.props.onImagePostChange(image);
            this.setState({image:image})
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

    // onBtnPostImagePress=async ()=>{
    //     this.setState({error:'',loading:true})
    //     try {
    //         console.log(this.state.image.path)
    //         const image = {
    //             uri: this.state.image.path,
    //             type: 'image/jpeg',
    //             name: 'photo.jpg',
    //         }
    //         const token=await AsyncStorage.getItem('usertoken')
    //         console.log(image)
    //         console.log(this.state.image.path)
    //         console.log(token)
    //         var formdata = new FormData();
    //         var options = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         }
    //         console.log(this.props.userid.id)
    //         var data = {
    //             caption: this.state.caption,
    //             userId: this.props.userid.id
    //         }
    //         formdata.append('image', image)
    //         formdata.append('data', JSON.stringify(data))
    //         console.log(image)
    //         console.log(data)
    //         const res = await axios.post(API_URL + '/post/addpost', formdata, options)
    //         console.log('berhasil')
    //         this.setState({ loading: false })
    //     } catch (error) {
    //         console.log(error)
    //         this.setState({ loading: false, error: error.Error })
    //     }
    // }
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
                        <Text style={{ color: 'red' }}>{this.state.error}</Text>
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
