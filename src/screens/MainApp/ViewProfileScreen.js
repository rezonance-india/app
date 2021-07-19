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
import Button from "../../components/Shared/Button"

const {width, height} = Dimensions.get('screen');

const ViewProfileScreen = ({route}) => {
	const [color,setColor] = useState(color);
	const [friendModalVisible, setFriendModalVisible] = useState(false);
	const [pendingModalVisible,setPendingModalVisible] = useState(false);
	const [listModalVisible,setListModalVisible] = useState(false);
	const [result,setResult] = useState({});
	const [refreshing,setRefreshing] = useState(false);
	const [currentUser,setCurrentUser] = useState(item);
	const {updateUser,token,user} = useContext(GlobalContext);

	console.log(route.params.item,"item");

    let isFriends = user.friends.filter((userId) => {
        userId === item._id
    })

    console.log(isFriends,"friend");

	const {item} = route.params;

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

	//?Todo fix on server side, populate both fields name and id in pending 
	useEffect(() => {
		const fetchUser = () => {
			axios.get(`${userApiUrl}/user/getAUser`)
			.then(async (res) => {
                setRefreshing(false);
				setCurrentUser(res.data); 
			}).catch((err) => {
                setRefreshing(false);
				console.log(err,"err");
				if (Array.isArray(err.response.data.errors)) {
					if (Platform.OS === 'android') {
					  ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
					}
				}
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

    //Send request connection
    const sendRequest = () => {

    }

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
				data={item ? item.friends : user.friends}
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
                        flexDirection:'row'
                    }}>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                        {item._id !== user._id ? (
                            <Button buttonStyle={{
								marginTop:100
							}} title="Send" onPressFunction={sendRequest}>Send</Button>
                        ):(
                           <>
                           </>   
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
									fontFamily:"NotoSans-Regular",
									fontSize:20
								}}>
									{item.friends.length}
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

						{item._id === user._id ? (

							<TouchableOpacity onPress={showPending}>

								<View style={{
									flexDirection:"column"
								}}>

									<Text style={{
										...styles.text,
										fontFamily:"NotoSans-Regular",
										fontSize:20
									}}>
										{item.pending.length}
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
                    
					</View>
			</ScrollView>
					
					<ScrollView>
						<View style={{
							flexDirection:"row",
							marginTop:30
						}}>
							{user._id === item._id ? (
								<>
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
								</>
							):(
								<>
								</>
							)}
							
						</View>	 	
						
						<FlatList
							keyExtractor={(item) => (item._id).toString()}
							data= {item.playlists}
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
		marginTop:"10%",
		fontFamily:"NotoSans-Bold"
	}
})

export default ViewProfileScreen;
