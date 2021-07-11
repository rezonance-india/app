import React,{useContext} from "react";
import {View,Text,Image,Dimensions, ToastAndroid} from "react-native";
import Type from "../../components/Shared/Type"
import { colors } from "../../constants/colors";
import Button from "../../components/Shared/Button";
import axios from "axios";
import { userApiUrl } from "../../constants/config";
import { GlobalContext } from "../../context/GlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width, height} = Dimensions.get('screen');

const List = ({item,friends,pending}) => {

    const {token,updateUser} = useContext(GlobalContext);

    const removeFriend = () => {
        console.log("in remove");
        axios.post(`${userApiUrl}/friends/removeFriend`,
        {
            friendId:item._id
        },
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then(async (res) => {
            console.log(res.data,"remove user data");
            updateUser(res.data);
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
        }).catch((err) => {
            console.log(err,"err");
            if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
                }
            }
        })     
    }

    const acceptRequest = () => {
        axios.post(`${userApiUrl}/friends/acceptFriendRequest`,
        {
            friendId:item._id
        },
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then(async (res) => {
            console.log(res.data.friends,"accept user data");
            updateUser(res.data.friends);
            await AsyncStorage.setItem('user', JSON.stringify(res.data.friends));
        }).catch((err) => {
            console.log(err,"err");
            if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
                }
            }
        })
    }

    const removeRequest = () => {
        axios.post(`${userApiUrl}/friends/removeFriend`,
        {
            friendId:item._id
        },
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then(async (res) => {
            console.log(res.data.user,"remove friend user data");
            updateUser(res.data.user);
            await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        }).catch((err) => {
            console.log(err,"err");
            if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
                }
            }
        })
    }

    const rejectRequest = () => {
        axios.post(`${userApiUrl}/friends/rejectRequest`,
        {
            friendId:item._id
        },
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then(async (res) => {
            console.log(res.data.friends,"remove friend user data");
            updateUser(res.data.friends);
            await AsyncStorage.setItem('user', JSON.stringify(res.data.friends));
        }).catch((err) => {
            console.log(err,"err");
            if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
                }
            }
        })
    }

    return (
        <View style={{flexDirection: 'row', width: '100%'}}>

			<View
				style={{
					width: width / 7,
					height: width / 7,
					marginVertical: 7,
					marginHorizontal: 15,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
                {/* <TouchableOpacity onPress = {}> */}
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1624387832956-1a33ddb5f7f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2735&q=80",
					}}
					style={{
						width: 50,
						height: 50,
						borderRadius: 6,
						overflow: 'hidden',
					}}
				/>
			</View>

			<View
				style={{
					marginVertical: 10,
					marginHorizontal: 15,
					justifyContent: 'space-around',
					flex: 1,
				}}>
				<View
					style={{
						flexDirection: 'row',
						marginTop: 5,
						justifyContent: 'space-between',
						flex:1,
						width: '100%',
					}}>
                        <View style={{
                            flex:1
                        }}>
                            <Type
                                style={{
                                    fontSize: width / 22,
                                    width: '80%',
                                    color: colors.text,
                                    marginTop:-4,
                                    fontFamily:"NotoSans-Bold"
                                }}>
                                {item.name.length > 30
                                    ? `${item.name.substring(0, 20)}....`
                                    : item.name}
                            </Type>
                        </View>
					
                        {
                            pending ? (
                                <View style={{
                                    flexDirection:"row",
                                    flex:1.2,
                                    justifyContent:"space-around"
                                }}>

                                <Button title="accept" onPressFunction={acceptRequest}>Accept</Button>
                                <Button backColor="transparent" title="Reject" borderColor="white" onPressFunction={rejectRequest}>Delete</Button>
                            </View>
                            ):(
                                friends ?
                                (
                                    <Button title="remove" onPressFunction={removeFriend}>Remove</Button>
                                ): (
                                    <>
                                    </>
                                )
                            )
                        }
                            
				</View>

				<Type
					style={{
						fontSize: width / 24,
						color: '#D3D3D3',
                        marginTop:-4,
                        fontFamily:"NotoSans"
					}}>
					{
                            pending ? (
                                "1 friend"
                            ):(
                                friends ?
                                (
                                    "1 friend"
                                ): (
                                    `${item.songs.length} ${item.songs.length> 1 ? "songs" : "song"}`
                                )
                            )
                        }
				</Type>
			</View>
		</View>
    )
}

export default List;