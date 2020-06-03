import React from 'react';
import {View, FlatList, Image, StatusBar,TouchableWithoutFeedback,VirtualizedList} from 'react-native'
import {  Icon } from 'react-native-elements';
import { Header,Card, CardItem, Thumbnail, Text, Button, Left, Body, Right,Icon as Naticon } from 'native-base';
import {connect} from 'react-redux'
import {getListPost,tambahTreshold} from './../redux/Action'
import {API_URL} from './../support/ApiUrl'
class Home extends React.PureComponent {
    state = {  }

    componentDidMount(){
        this.props.getListPost()
    }

    onRefresh=()=>{
        console.log('masuk refresh')
        this.props.getListPost()
    }

    renderItemPost = ({ item }) => {
        // console.log(item.item)
        // const {data}=item
        // console.log(data)
        return (
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <Card>
                    <TouchableWithoutFeedback >
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: `${API_URL}${item.profileimage}`}} />
                                <Body>
                                    <Text>{item.username}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </TouchableWithoutFeedback>
                    <CardItem cardBody>
                        <Image source={{uri: `${API_URL}${item.image}` }} style={{height: 350, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{item.caption}</Text>
                        </Left>
                    </CardItem>
                </Card>
            </View>
        )
    }

s

    render() {
        // console.log(this.props.Post)
        return (
            <View style={{flex:1}}>
                <Header style={{elevation:2,backgroundColor:'#fff'}}>
                    <StatusBar backgroundColor={'gray'} barStyle={'light-content'}/>
                    <Left>
                        <Naticon name='camera' type='Feather' style={{color:'salmon'}}  />
                    </Left>
                    <Body style={{alignItems:'center'}}>
                        <View style={{width:50,}}>
                            <Image
                                style={{width:150,height:45,tintColor:'salmon'}}
                                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
                                }}
                            />
                        </View>
                    </Body>
                    <Right>
                        <Naticon name='paper-plane' style={{color:'salmon'}} />
                    </Right>
                </Header>
                <FlatList
                    data={this.props.postdata}
                    renderItem={this.renderItemPost}
                    refreshing={this.props.Post.homeRefreshing} 
                    onRefresh={this.onRefresh}
                    keyExtractor={item => item.id}
                    initialNumToRender={3}
                    // initialScrollIndex={3}
                    onEndReached={()=>this.props.tambahTreshold()}
                    onEndReachedThreshold={1}
                    // getItemCount={()=>this.props.Post.postList.length}
                    // getItem={this.getItem}
                />
            </View>
          );
    }
}
const Mapstatetoprops=(state)=>{
    var newarr=state.Post.postList.filter((val,index)=>index<state.Post.treshold)
    return{
        Post:state.Post,
        postdata:newarr,
        treshold:state.Post.treshold
    }
}
export default connect(Mapstatetoprops,{getListPost,tambahTreshold}) (Home);

