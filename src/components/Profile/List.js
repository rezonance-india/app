import React,{useContext,useState} from "react";
import {View,Text,Image,Dimensions, ToastAndroid, TouchableOpacity} from "react-native";
import Type from "../../components/Shared/Type"
import { colors } from "../../constants/colors";
import Button from "../../components/Shared/Button";
import axios from "axios";
import { userApiUrl } from "../../constants/config";
import { GlobalContext } from "../../context/GlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RemoveFriendModal from "./RemoveFriendModal";

const {width, height} = Dimensions.get('screen');

const List = ({item,friends,pending,currentUser}) => {
    

    const {updateUser,user} = useContext(GlobalContext);
	const [confirmationModalVisible,setConfirmationModalVisible] = useState(false);
    
    const acceptRequest = () => {
        axios.post(`${userApiUrl}/friends/acceptFriendRequest`,
        {
            friendId:item._id,
            userId:user._id
        })
        .then(async (res) => {
            console.log(res.data.friends,"accept user data");
            updateUser(res.data.friends);
            ToastAndroid.show(`You are now friends with ${item.name}`, ToastAndroid.SHORT);
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

    const removeFriend = () => {
        setConfirmationModalVisible(true);
    }

    const rejectRequest = () => {
        axios.post(`${userApiUrl}/friends/rejectRequest`,
        {
            friendId:item._id,
            userId:user._id
        })
        .then(async (res) => {
            console.log(res.data.friends,"remove friend user data");
            updateUser(res.data.friends);
            ToastAndroid.show(`Request rejected`, ToastAndroid.SHORT);
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
            <RemoveFriendModal
				id = {item._id}
				toggleVisibility={setConfirmationModalVisible}
				modalVisible={confirmationModalVisible}
			/>	
            {/* <TouchableOpacity onPress={renderFunc}> */}
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
						uri: item?.songs && item.songs.length > 0 ? item.songs[0].albumArt : (
                            item.username ? item.photo : "https://images.unsplash.com/photo-1624387832956-1a33ddb5f7f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2735&q=80"
                        )
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
                                    marginTop:-6,
                                    fontFamily:"NotoSans-Bold"
                                }}>
                                {
                                    item.username ? item.username : item.name 
                                }
                            </Type>
                        </View>
					
                        {
                            pending  ? (
                                <View style={{
                                    flexDirection:"row",
                                    flex:1.2,
                                    justifyContent:"space-around"
                                }}>
                                <Button title="accept" onPressFunction={acceptRequest}>Accept</Button>
                                <Button backColor="transparent" title="Reject" borderColor="white" onPressFunction={rejectRequest}>Delete</Button>
                            </View>
                            ):(
                                friends && currentUser === user._id?
                                (
                                    <Button title="remove" backColor = {friends ? "red" :""} onPressFunction={removeFriend}>Remove</Button>
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
                        marginTop:-12,
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
            {/* </TouchableOpacity> */}
		</View>
    )
}

export default List;