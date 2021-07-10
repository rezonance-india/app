import React,{useEffect,useState,useContext} from 'react';
import {Text,View,Image,StyleSheet,FlatList,Dimensions,ScrollView, TouchableOpacity} from 'react-native';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import { ACCENT, colors } from '../../constants/colors';
import ImageColors from 'react-native-image-colors';
import { playlistData } from '../../constants/playlistdata';
import List from "../../components/Profile/List"
import { userData } from '../../constants/store';
import Icon from 'react-native-vector-icons/Ionicons';
import Type from "../../components/Shared/Type"
import FriendsModal from '../../components/Profile/FriendsModal';
import PendingRequestsModal from '../../components/Profile/PendingRequestsModal';
import { GlobalContext } from '../../context/GlobalState';
import axios from 'axios';
import { userApiUrl } from "../../constants/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const ProfileScreen = ({route}) => {
	const [color,setColor] = useState(color);
	const [friendModalVisible, setFriendModalVisible] = useState(false);
	const [pendingModalVisible,setPendingModalVisible] = useState(false);
	const [result,setResult] = useState({});
	// const [token,setToken] = useState("");
	const {updateUser,token,user} = useContext(GlobalContext);

	const {imageUrl} = route.params;

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

	useEffect(() => {
		console.log(token,"token USE");
		const fetchUser = () => {
			axios.get(`${userApiUrl}/user/getUser`,{
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then(async (res) => {
				console.log(res.data,"data");
				updateUser(res.data);
				setResult(res.data); 
				await AsyncStorage.setItem('user', JSON.stringify(res.data));
			}).catch((err) => {
				console.log(err,"err");
				// console.log(Array.isArray(err.response.data.errors[0].msg));
				if (Array.isArray(err.response.data.errors)) {
					if (Platform.OS === 'android') {
					  ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
					}
				}
			})
		}
		fetchUser();
	},[token])

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

	console.log(result.playlists,"data");

    return (
        <LinearGradientComp
			bgcolors={{
				colorOne: color ? color : '#7f8c8d',
				colorTwo: ACCENT,
			}}>
			
			<FriendsModal
				data={result ? result.friends : []}
				toggleVisibility={setFriendModalVisible}
				modalVisible={friendModalVisible}
			/>

			<PendingRequestsModal
				toggleVisibility={setPendingModalVisible}
				modalVisible={pendingModalVisible}
			/>				

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
					{/* {0} */}
					{result ? result.name : ""}
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
								fontFamily:"NotoSans-Regular",
								fontSize:20
							}}>
								{/* {"0"} */}
								{result.friends ? result.friends.length : "0"}
							</Text>

							<Text style={{
								...styles.text,
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
								{/* {"0"} */}
								{result.pending ? result.pending.length : "0"}
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
					</View>
					
				</View>	 	
				
				<FlatList
					keyExtractor={(item) => (item._id).toString()}
					data= {result.playlists ? result.playlists : []}
					renderItem={renderer}
					showsVerticalScrollIndicator={false}
				/>
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
