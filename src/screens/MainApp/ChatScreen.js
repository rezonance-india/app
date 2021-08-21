import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState,useEffect,useContext,useCallback} from 'react';
import {
	Text, View, ScrollView, Image, StyleSheet,TouchableOpacity,FlatList,
	ToastAndroid,RefreshControl
} from 'react-native';
import SearchBox from '../../components/Search/SearchBox';
import FillerContent from '../../components/Shared/FillerContent';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import MiniPlayer from '../../components/Shared/MiniPlayer';
import {ACCENT, PRIMARY} from '../../constants/colors';
import { userApiUrl } from '../../constants/config';
import {userData} from '../../constants/store';
import { GlobalContext } from '../../context/GlobalState';

const ChatScreen = ({navigation}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const {user,updateMessages,messages,token,queue} = useContext(GlobalContext);
	const [refreshing,setRefreshing] = useState(false);

	const search = () => {
		console.log('in search frands');
	};
	
	//?Todo On first login it wont get messages from global queue, so pass it from the messaging
	//?Todo screen only

	console.log(messages,"messages from gs");

	const dateFunc = (dynamicDate) => {
		const d = new Date(dynamicDate);
		const today = new Date();

		const diff = parseInt(((today - d)/60000));

		if(diff>0 && diff<60){
			return `${diff}mins`;
		}
		else if(diff > 60 && diff < 1440){
			return `${parseInt(diff/60)} hours`
		}
		else if(diff > 1440 && diff < 10800){
			return `${parseInt(diff/1440)} days`
		}
		else if(diff > 10080 && diff < 43200){
			return `${parseInt(diff/10080)} weeks`
		}
		else if(diff > 43200 && diff < 518400){
			return `${parseInt(diff/43200)} months`
		}
		else{
			return `${diff} secs ago`
		}
	}

	useEffect(() => {
		if(messages.length === 0 || refreshing){
			console.log("in")
			axios.get(`${userApiUrl}/messages/getMessages`,{
				headers: {
					Authorization: "Bearer " + token,
				}
			})
			.then(async (res) => {
				console.log(res.data,"from local messages");
				updateMessages(res.data);
				setRefreshing(false);
				await AsyncStorage.setItem("messages",JSON.stringify(res.data));
			}).catch((err) => {
				console.log(err,"err");
				setRefreshing(false);
				if (Platform.OS === 'android') {
					ToastAndroid.show("Network Error", ToastAndroid.SHORT);
				}
			})
		}
	},[refreshing])

	const onRefresh = useCallback(() => {
    	setRefreshing(true);
  	}, []);

	const renderer = ({item}) => {
		const pressChatBox = () => {
			navigation.navigate("MessagingScreen",{
				item
			})
		}

		return (
			<View
				key={item._id}
				style={{
					flexDirection: 'column',
					marginVertical:"5%",
					height: '10%',
				}}>
			
					<TouchableOpacity onPress={pressChatBox}
						style={{
							flexDirection: 'row',
						}}>
							
						<Image
							source={{uri: item.to._id !== user._id ? item.to.photo : item.user.photo}}
							style={{
								borderRadius: 20,
								left: 10,
								width: 50,
								height: 50,
							}}
						/>

						<View
							style={{
								flex: 1,
							}}>
							<View
								style={{
									flexDirection: 'row',
								}}>
								<Text style={{
									...styles.options,
									marginLeft:30
								}}>
									{item.to._id !== user._id ? 
										item.to.username.length > 30
										? item.to.username.substring(0, 30) +
										'...'
										: item.to.username
										: 
										(
										item.user.username.length > 30
										? item.user.username.substring(0, 30) +
										'...'
										: item.user.username
										)
									}
								</Text>
							</View>
							<View
								style={{
									maxWidth: '80%',
									flexDirection: 'row',
								}}>
									<View style={{
										width:"90%"
									}}>
											<Text
									style={{
										...styles.options,
										fontSize: 14,
										marginLeft:30,
										marginTop: 2,
										fontFamily: 'NotoSans-Regular',
									}}>
									{`${item.chat[item.chat.length-1].user._id === user._id ? "You" : item.chat[item.chat.length-1].user.username} shared ${item.chat[item.chat.length-1].message.trackName}, By ${item.chat[item.chat.length-1].message.artistName}`}.
								</Text>		
									</View>

								
								<Text
									style={{
										...styles.options,
										opacity:0.75,
										marginTop: -25,
										marginLeft:10,
									}}>
									{dateFunc(item.chat[item.chat.length-1].messageSentAt)}
								</Text>
							</View>
						</View>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<LinearGradientComp
			bgcolors={{
				colorOne: "rgb(15, 15, 15)",
				colorTwo: "rgb(15, 15, 15)",
			}}>
			<ScrollView 
				 refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
        		}
			>

				<Text
					style={{
						marginTop:"15%",
						fontSize: 26,
						color: 'white',
						marginBottom: 10,
						marginLeft: 20,
						letterSpacing: 0,
						fontFamily: 'NotoSans-Regular',
					}}>
					Messages
				</Text>
				<View style={{
					marginBottom:20
				}}>
					{
						messages.length > 0 ? (
							<FlatList
								keyExtractor={(item) => item._id}
								data={messages}
								renderItem={renderer}
								showsVerticalScrollIndicator={false}
							/>
						)
						:(
							<>
								<FillerContent extraStyles={true} text={"No messages to Show"} />
							</>
						)
					}
				</View>
			</ScrollView>
			{queue && queue.length > 0 ? <MiniPlayer nav={navigation} /> : null}
		</LinearGradientComp>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	modalView: {
		marginTop: '100%',
		width: '100%',
		height: '50%',
	},
	options: {
		color: 'white',
		fontFamily: 'NotoSans-Bold',
		fontSize: 16,
	},
	button: {
		backgroundColor: '#09a0eb',
		height: 35,
		width: 70,
		borderRadius: 5,
		paddingVertical: 6,
	},
	textButton: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});
