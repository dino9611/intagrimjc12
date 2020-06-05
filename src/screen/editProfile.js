import React, { Component } from 'react';
import {Text,View,Image,TouchableWithoutFeedback, Platform,ActivityIndicator} from 'react-native';
import {Header,Button,Overlay,Input,Icon} from 'react-native-elements'
import { connect } from 'react-redux';
import {onInputEditProfileText,saveProfileImage,saveProfile} from './../redux/Action'
import ImagePicker from 'react-native-image-crop-picker'
import {API_URL} from './../support/ApiUrl'
// import { Icon } from 'native-base';

class EditProfile extends Component {
    state = {
        isVisible:false
    }
    componentDidUpdate() {
        if(this.props.EditProfiles.saveProfileSuccess) {
            this.props.navigation.goBack()
        }
    }
    onSelectGallerryPress=()=>{
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then((image)=>{
            this.setState({ isVisible: false })
            this.props.saveProfileImage(image);
        }).catch((error)=>{
            console.log(error)

        })
    }





    render() {
    //    console.log(this.props.EditProfiles)
        return (
            <View>
                <Header
                    placement='left'
                    leftComponent={{
                        icon:'clear',
                        color:'tomato',
                        onPress:this.props.navigation.goBack
                    }}
                    centerComponent={{
                        text:'Edit Profile',
                        style:{color:'tomato', fontSize:18, fontWeight:'bold'}
                    }}
                    rightComponent={
                        this.props.EditProfiles.loading?
                        <ActivityIndicator color='#4388d6'/>
                        :
                        <Icon name='done' color='#4388d6' onPress={()=>this.props.saveProfile(this.props.EditProfiles)}/>
                    }
                    containerStyle={{
                        backgroundColor:'#fff',
                        justifyContent:'space-around',
                        elevation:2,
                        marginTop:Platform.OS === 'ios' ? 0: -25 
                    }}
                />
                <View style={{alignItems:'center',marginTop:14}}>
                    <Image
                        source={{uri:`${API_URL+this.props.EditProfiles.profileimage}`}}
                        style={{width:90,height:90,borderRadius:90}}
                    />
                    <TouchableWithoutFeedback
                        onPress={()=>this.setState({isVisible:true})}
                    >
                        <Text style={{ color: '#4388d6', fontSize: 17, paddingTop: 10 }} >
                            Change Profile Photo
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{paddingTop:15}}>
                    <Text
                        style={{
                            paddingLeft:12,
                            opacity:0.3
                        }}
                    >
                        Name
                    </Text>
                    <Input
                        placeholder='Displayname'
                        onChangeText={(text)=>this.props.onInputEditProfileText('displayname',text)}
                        value={this.props.EditProfiles.displayname}
                    />
                </View>
                <View style={{paddingTop:15}}>
                    <Text
                        style={{
                            paddingLeft:12,
                            opacity:0.3
                        }}
                    >
                        Username
                    </Text>
                    <Input
                        placeholder='Username'
                        onChangeText={(text)=>this.props.onInputEditProfileText('username',text)}
                        onChangeText={(text)=>this.setState({Username:text})}
                    /> 
                </View>
                <View style={{paddingTop:15}}>
                    <Text
                        style={{
                            paddingLeft:12,
                            opacity:0.3
                        }}
                    >
                        Bio
                    </Text>
                    <Input
                        placeholder='Bio'
                        onChangeText={(text)=>this.props.onInputEditProfileText('bio',text)}
                        value={this.props.EditProfiles.bio}
                    />
                </View>
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={()=>this.setState({isVisible:false})}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '800',
                                paddingBottom: 10,
                                borderBottomColor: '#cfcfcf',
                                borderBottomWidth: 1
                            }}
                        >
                            Change Profile Photo
                        </Text>
                        <TouchableWithoutFeedback
                            onPress={this.onSelectGallerryPress}
                        >
                            <Text
                                style={{
                                    paddingVertical:15,
                                    fontSize:16
                                }}
                            >
                                Select from Gallery
                            </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Text
                                style={{
                                    paddingVertical:15,
                                    fontSize:16
                                }}
                            >
                                Open Camera
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </Overlay>
            </View>
          );
    }
}
const mapStateToProps = ({ EditProfiles }) => {
    return { EditProfiles }
}
export default connect(mapStateToProps,{onInputEditProfileText,saveProfileImage,saveProfile})  (EditProfile);