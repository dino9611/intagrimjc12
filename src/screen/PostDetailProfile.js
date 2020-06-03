import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon, Overlay, Input } from 'react-native-elements';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import {connect} from 'react-redux'
import {API_URL} from './../support/ApiUrl'

const PostDetailProfile = ({
    postDetail,navigation
}) =>{

    // console.log('ini redux',postDetail)
    // console.log('================================================')
    // console.log('ini params',route.params.dino)

    return (
        <View>
            <Header
                placement='left'
                centerComponent={{ 
                    text: 'Post', 
                    style: { color: 'tomato', fontSize: 18, fontWeight: '700' } 
                }}
                leftComponent={{ 
                    icon: 'arrow-back', 
                    color: 'tomato',
                    onPress: () => navigation.goBack()
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                    elevation: 2,
                    marginTop: Platform.OS === 'ios' ? 0 : - 25
                }}
            />
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <Card>
                    <TouchableWithoutFeedback >
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: `${API_URL}${postDetail.profileimage}`}} />
                                <Body>
                                    <Text>{postDetail.username}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                            <Right>
                            <Icon
                                name='more-vert'
                                size={30}
                                // onPress={() => this.setState({ isVisible: true })}
                            />
                        </Right>
                        </CardItem>
                    </TouchableWithoutFeedback>
                    <CardItem cardBody>
                        <Image source={{uri: `${API_URL}${postDetail.image}` }} style={{height: 350, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{postDetail.caption}</Text>
                        </Left>
                    </CardItem>
                </Card>
            </View>
        </View>
    );

} 
const MapstateToProps=({Post})=>{
    return{
        postDetail:Post.selectedPostDetailProfile
    }
}
export default connect(MapstateToProps) (PostDetailProfile);
