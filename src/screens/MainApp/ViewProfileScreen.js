import React,{useEffect,useState,useContext} from 'react';
import {Text,View,Image,StyleSheet,FlatList,Dimensions,ScrollView, TouchableOpacity, RefreshControl, ToastAndroid} from 'react-native';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import { ACCENT, colors } from '../../constants/colors';
import ImageColors from 'react-native-image-colors';
import List from "../../components/Profile/List"
import Icon from 'react-native-vector-icons/Ionicons';
import Type from "../../components/Shared/Type"
import FriendsModal from '../../components/Profile/FriendsModal';
import PendingRequestsModal from '../../components/Profile/PendingRequestsModal';
import { GlobalContext } from '../../context/GlobalState';
import axios from 'axios';
import { userApiUrl } from "../../constants/config";
import PlayListModal from '../../components/Profile/PlayListModal';
import Button from "../../components/Shared/Button"
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const ViewProfileScreen = ({route}) => {
	const [color,setColor] = useState(color);
	const [friendModalVisible, setFriendModalVisible] = useState(false);
	const [pendingModalVisible,setPendingModalVisible] = useState(false);
	const [listModalVisible,setListModalVisible] = useState(false);
	const [refreshing,setRefreshing] = useState(false);
	const [isSent,setIsSent] = useState(false);
	const [areFriends,setAreFriends] = useState(false);
	const {updateUser,user} = useContext(GlobalContext);

	const {item} = route.params;

	const [currentUser,setCurrentUser] = useState(item);

	const imageUrl = "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80";

	const renderer = ({item}) => {
		return(
			<List item = {item} /> 
		)
	}

	const openModal = () => {
		setFriendModalVisible(true);
	}

	const showPending = () => {
		setPendingModalVisible(true);
	}

	const createPlaylist = () => {
		setListModalVisible(true);
	}

	useEffect(() => {
		const fetchUser = () => {
			axios.post(`${userApiUrl}/user/getAUser`,{
				_id:currentUser._id
			})
			.then(async (res) => {
                setRefreshing(false);
				setCurrentUser(res.data); 
			}).catch((err) => {
                setRefreshing(false);
				console.log(err,"err");
			})
		}

        if(refreshing !== false || areFriends === false ){
            fetchUser();
        }		
	},[refreshing,isSent,areFriends])

	useEffect(() => {
		const getDominantColors = async () => {
			
			const colors = await ImageColors.getColors(imageUrl, {
				fallback: '#7f8c8d',
			});

			if (colors.platform === 'android') {
				const {lightVibrant,average} = colors;

				if(lightVibrant === "#000000"){
					averageColor = average;
				}
				else {
					averageColor = lightVibrant;
				}
				setColor(averageColor);
			} else {
				const backgroundColor = colors.background;
				setColor(backgroundColor);
			}
			return averageColor;
		};
		getDominantColors();
	}, [imageUrl]);

	const onRefresh = React.useCallback(() => {
    	setRefreshing(true);
  	}, []);
		
	  const genFunc = () => {
		  
		  if(!isSent){
			//Send request
			axios.post(`${userApiUrl}/friends/addFriend`,{
				friendId:currentUser._id,
				userId:user._id
			}).then((res) => {
				setIsSent(true);
				setAreFriends(false);
				if (Platform.OS === 'android') {
					ToastAndroid.show("Request sent successfully", ToastAndroid.SHORT);
				}
			}).catch((err) => {
				// if (Array.isArray(err.response.data.errors)) {
				// 	if (Platform.OS === 'android') {
				// 		ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
				// 	}
				// }
				console.log(err);
			})
		}
		if(areFriends){
			//Remove from friends 
			axios.post(`${userApiUrl}/friends/removeFriend`,
			{
				friendId:currentUser._id,
				userId:user._id
			})
			.then(async (res) => {
				setAreFriends(false);
				setIsSent(false);
				updateUser(res.data);
				await AsyncStorage.setItem('user', JSON.stringify(res.data));
				ToastAndroid.show(`Friendship ended with ${currentUser.name}`, ToastAndroid.SHORT);
			}).catch((err) => {
				console.log(err,"err");
				// if (Array.isArray(err.response.data.errors)) {
				// 	if (Platform.OS === 'android') {
				// 		ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
				// 	}
				// }
			})
		}
	}

	useEffect(() => {
		//Checking if the auth user has sent request to the currentUser
		currentUser.pending.map((peep) => {
			if(peep == user._id){
				setIsSent(true);		
			}
		})

		//Checking if the auth user is friends with the current user
		currentUser.friends.map((peep) => {
			if(peep._id === user._id){
				setAreFriends(true);
			}
		})
	},[refreshing])
	
    return (
        <LinearGradientComp
			bgcolors={{
				colorOne: color ? color : '#7f8c8d',
				colorTwo: ACCENT,
			}}>
			
			<PlayListModal
				toggleVisibility={setListModalVisible}
				modalVisible={listModalVisible}
			/>

			<FriendsModal
				currentUser={true}
				data={currentUser ? currentUser.friends : user.friends}
				toggleVisibility={setFriendModalVisible}
				modalVisible={friendModalVisible}
			/>

			<PendingRequestsModal
				data = {user.pending}
				toggleVisibility={setPendingModalVisible}
				modalVisible={pendingModalVisible}
			/>				

			<ScrollView 
				 refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
        		}
			>

				<View style={{
					flexDirection:"column",
					justifyContent:"space-between",
					alignItems:"center",
					marginTop:"30%"
				}}>
					<Image
						source={{uri: imageUrl}}
						style={{
							borderRadius: 70,
							width: 140,
							height: 140,
					}} />
                    <View style={{
                        flexDirection:'row',
						justifyContent:"space-between"
                    }}>
                        <Text style={{
							...styles.text,
							top:"-1%"
						}}>
                            {currentUser.name}
                        </Text>
                        {currentUser._id !== user._id ? (
                            <Button buttonStyle={{
								marginTop:"35%",
								width:80,
								height:40,
							}}
							textStyles = {{
								fontSize:18
							}} 
							title="Send" onPressFunction={genFunc}>
								{
									areFriends ? "Remove" : (
										isSent ? "Sent" : "Send"
									)
								}
							</Button>
                        ):(
							areFriends ? (
								<Button buttonStyle={{
									marginTop:"35%",
									width:80,
									height:40,
								}}
								textStyles = {{
									fontSize:18
								}} 
								title="Send" onPressFunction={sendRequest}>
									{}
							</Button>
							) :(
								<>
								</>
							)
						)}    
                    </View>
				</View>

					<View style={{
						flexDirection:"row",
						justifyContent:"space-around",
						marginTop:20,
					}}>
						<View style={{
							flexDirection:"column",
						}}>
							<TouchableOpacity onPress={openModal}>
								<Text style={{
									...styles.text,
									fontWeight:"bold",
									fontFamily:"NotoSans-Regular",
									fontSize:20,
									top:"8%"
								}}>
									{currentUser.friends.length}
								</Text>

								<Text style={{
									...styles.text,
									fontFamily:"5NotoSans-Regular",
									fontSize:20,
									top:"8%"
								}}>
									Friends
								</Text>
							</TouchableOpacity>

						</View>

						{currentUser._id === user._id ? (

							<TouchableOpacity onPress={showPending}>

								<View style={{
									flexDirection:"column"
								}}>

									<Text style={{
										...styles.text,
										fontFamily:"NotoSans-Regular",
										fontSize:20,
										fontWeight:"bold"
									}}>
										{currentUser.pending.length}
									</Text>
									<Text style={{
										...styles.text,
										fontFamily:"NotoSans-Regular",
										fontSize:20
									}}>
										Pending
									</Text>
								</View>
							</TouchableOpacity>
						):(
							<>
							</>
						)}
						
							<View style={{
								flexDirection:"column"
							}}>

								<Text style={{
									...styles.text,
									fontFamily:"NotoSans-Regular",
									fontSize:20,
									fontWeight:"bold"

								}}>
									{currentUser.playlists.length}
								</Text>
								<Text style={{
									...styles.text,
									fontFamily:"NotoSans-Regular",
									fontSize:20
								}}>
									Playlists
								</Text>

							</View>

					</View>
			</ScrollView>
					
					<ScrollView>
							{user._id === currentUser._id ? (
								<>
								<View style={{
									flexDirection:"row",
									marginTop:10
								}}>
									<Icon
										name="create-outline"
										size={60}
										style={{marginHorizontal:15, color:"white"}}
									/>
									<View
										style={{
											flexDirection: 'row',
											marginTop:15,
											justifyContent: 'space-between',
											flex: 1,
											width: '100%',
									}}>
										<TouchableOpacity onPress={createPlaylist}>
										<Type
											style={{
												fontSize: width / 22,
												width: '90%',
												color: colors.text,
												magintTop:-20,
												fontFamily:"NotoSans-Bold"
											}}>
											{"Create Playlist"}
										</Type>
										</TouchableOpacity>
									</View>
								</View>
								</>
							):(
								<>
								</>
							)}
							
						{currentUser.playlists.length > 0 ? (
							<>
								{user._id !== currentUser._id ? (
									<Text style={{
										...styles.text,
										top:"-5%"
									}}>
									Public Playlists
									</Text>
								) :(
									<>
									</>
								)} 

								<FlatList
									keyExtractor={(item) => (item._id).toString()}
									data= {currentUser.playlists}
									renderItem={renderer}
									showsVerticalScrollIndicator={false}
								/>
							</>
						):(
							<Text style={{
								...styles.text,
								marginHorizontal:"5%",
								fontFamily:"Noto-Sans"
							}}>
								The User has no playlist! Send them a song maybe?
							</Text>
						)}
					</ScrollView>
		</LinearGradientComp>
    )
};

const styles = StyleSheet.create({
	text:{
		fontSize:24,
		color:"white",
		marginTop:"10%",
		marginLeft:"5%",
		fontFamily:"NotoSans-Bold"
	}
})

export default ViewProfileScreen;
