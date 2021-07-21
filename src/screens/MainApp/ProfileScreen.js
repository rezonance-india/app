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
	const [color,setColor] = useState(color);
	const [friendModalVisible, setFriendModalVisible] = useState(false);
	const [pendingModalVisible,setPendingModalVisible] = useState(false);
	const [listModalVisible,setListModalVisible] = useState(false);
	const [result,setResult] = useState({});
	const [refreshing,setRefreshing] = useState(false);
	const {updateUser,token,user} = useContext(GlobalContext);

	console.log(user,"user");

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

	const openModal = () => {
		setFriendModalVisible(true);
	}

	const showPending = () => {
		setPendingModalVisible(true);
	}

	const createPlaylist = () => {
		setListModalVisible(true);
	}

	//?Todo fix on server side, populate both fields name and id in pending 
	useEffect(() => {
		const fetchUser = () => {
			console.log("chala");
			axios.get(`${userApiUrl}/user/getUser`,{
				headers: {
					Authorization: "Bearer " + token,
				},
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
					marginTop:"30%"
				}}>
					<Image
						source={{uri: imageUrl}}
						style={{
							borderRadius: 70,
							width: 140,
							height: 140,
						}} />
					<Text style={styles.text}>
						{user.name}
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

							<Text style={{
								...styles.text,
								fontFamily:"NotoSans-Regular",
								fontSize:20
							}}>
								0
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
