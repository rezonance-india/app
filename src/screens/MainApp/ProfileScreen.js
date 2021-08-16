import React,{useEffect,useState,useContext} from 'react';
import {Text,View,Image,StyleSheet,FlatList,Dimensions,ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlayListModal from '../../components/Profile/PlayListModal';

const {width, height} = Dimensions.get('screen');

const ProfileScreen = ({route,navigation}) => {
	const {item} = route.params;
	const [color,setColor] = useState(color);
	const [friendModalVisible, setFriendModalVisible] = useState(false);
	const [pendingModalVisible,setPendingModalVisible] = useState(false);
	const [listModalVisible,setListModalVisible] = useState(false);
	const [result,setResult] = useState(item ? item : {});
	const [refreshing,setRefreshing] = useState(false);
	const {updateUser,user,likedSongs} = useContext(GlobalContext);

	const {imageUrl} = route.params;

	const renderer = ({item}) => {
		return(
			<TouchableOpacity onPress={() => {
				navigation.navigate("PlaylistScreen",{
					item
				})
			}}>
				<List item = {item} /> 
			</TouchableOpacity>	
		)
	}

	console.log(likedSongs,"likedsongs");


	console.log(user.playlists,"user");

	const openModal = () => {
		setFriendModalVisible(true);
	}

	const showPending = () => {
		setPendingModalVisible(true);
	}

	const createPlaylist = () => {
		setListModalVisible(true);
	}

	//Fetches the user upon pull to refresh and on first mount
	useEffect(() => {
		const fetchUser = () => {
			axios.post(`${userApiUrl}/user/getUser`,{
				userId:user._id
			})
			.then(async (res) => {
				updateUser(res.data);
				setResult(res.data); 
				await AsyncStorage.setItem('user', JSON.stringify(res.data));
				setRefreshing(false);
			}).catch((err) => {
				console.log(err,"err");
				// console.log(Array.isArray(err.response.data.errors[0].msg));
				if (Array.isArray(err.response.data.errors)) {
					if (Platform.OS === 'android') {
					  ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
					}
				}
				setRefreshing(false);
			})
		}
		
		if(refreshing !== false){
			fetchUser();
		}
	},[refreshing])

	//Function to set the bg gradient simmilar to profile pic's colors
	useEffect(() => {
		const getDominantColors = async () => {
			
			const colors = await ImageColors.getColors(user.photo, {
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

    return (
        <LinearGradientComp
			bgcolors={{
				colorOne: '#2b4162',
				colorTwo: ACCENT,
			}}>
			
			<PlayListModal
				toggleVisibility={setListModalVisible}
				modalVisible={listModalVisible}
			/>

			<FriendsModal
				currentUser={user}
				data={user.friends}
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
					marginTop:"20%"
				}}>
					<Image
						source={{uri: user.photo}}
						style={{
							borderRadius: 70,
							width: 140,
							height: 140,
						}} />
					<Text style={styles.text}>
						{user.username}
					</Text>
				</View>

					<View style={{
						flexDirection:"row",
						justifyContent:"space-around",
						marginTop:20,
					}}>
						<View style={{
							flexDirection:"column",
						}}>

							{/* Friends Modal*/}
							<TouchableOpacity onPress={openModal}>
								<Text style={{
									...styles.text,
									top:"5%",
									fontFamily:"NotoSans-Regular",
									fontSize:20
								}}>
									{user.friends.length}
								</Text>

								<Text style={{
									...styles.text,
									top:"5%",
									fontFamily:"NotoSans-Regular",
									fontSize:20
								}}>
									Friends
								</Text>
							</TouchableOpacity>

						</View>

						<TouchableOpacity onPress={showPending}>

							<View style={{
								flexDirection:"column"
							}}>

								{/* Pending Modal*/}

								<Text style={{
									...styles.text,
									fontFamily:"NotoSans-Regular",
									fontSize:20
								}}>
									{user.pending.length}
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

						<View style={{
							flexDirection:"column"
						}}>

							{/* Playlist ( Needs to be removed tho) */}
							<Text style={{
								...styles.text,
								fontFamily:"NotoSans-Regular",
								fontSize:20
							}}>
								{user.playlists.length}
							</Text>
							
							<Text style={{
								...styles.text,
								fontFamily:"NotoSans-Regular",
								fontSize:20
							}}>
								Playlist
							</Text>
						</View>
					</View>

					<ScrollView>
						<View style={{
							flexDirection:"row",
							marginTop:30
						}}>
							<Icon
								name="add-outline"
								size={60}
								style={{marginHorizontal:15, color:"white"}}
							/>

							<View
								style={{
									flexDirection: 'row',
									marginTop:15,
									marginBottom: 10,
									justifyContent: 'space-between',
									flex: 1,
									width: '100%',
							}}>
								<TouchableOpacity onPress={createPlaylist}>
								<Type
									style={{
										fontSize: width / 22,
										width: '80%',
										color: colors.text,
										marginHorizontal:10,
										fontFamily:"NotoSans-Bold"
									}}>
									{"Create Playlist"}
								</Type>
								</TouchableOpacity>
							</View>
							
						</View>	 	
						
						<FlatList
							keyExtractor={(item) => (item._id).toString()}
							data= {user.playlists}
							renderItem={renderer}
							showsVerticalScrollIndicator={false}
						/>

						{/* Liked Songs (Need to use with resuable code only) */}
						
						<TouchableOpacity onPress={() => {

							const item = {_id:123,songs:likedSongs,name:"Liked Songs"};

							navigation.navigate("PlaylistScreen",{
								item
							})
						}}>

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

						<Image
							source={{
								uri: likedSongs?.length > 0 ? likedSongs[0].albumArt : "https://images.unsplash.com/photo-1624387832956-1a33ddb5f7f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2735&q=80"
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
										color: "white",
										marginTop:-6,
										fontFamily:"NotoSans-Bold"
									}}>
									{"Liked Songs"}
								</Type>
                        	</View>
						</View>
						
					<Type
						style={{
							fontSize: width / 24,
							color: '#D3D3D3',
							marginTop:-12,
							fontFamily:"NotoSans"
						}}
						>
					{
						`${likedSongs.length} ${likedSongs.length> 1 ? "songs" : "song"}`
                    }
					</Type>
				</View>
					</View>
				</TouchableOpacity>
					</ScrollView>
			</ScrollView>
		</LinearGradientComp>
    )
};

const styles = StyleSheet.create({
	text:{
		fontSize:24,
		color:"white",
		marginTop:"4%",
		fontFamily:"NotoSans-Bold"
	}
})

export default ProfileScreen;
