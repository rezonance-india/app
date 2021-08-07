import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState,useEffect,useContext} from 'react';
import {Text, View, ScrollView, Image, StyleSheet,TouchableOpacity,FlatList, ToastAndroid} from 'react-native';
import SearchBox from '../../components/Search/SearchBox';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import {ACCENT, PRIMARY} from '../../constants/colors';
import { userApiUrl } from '../../constants/config';
import {userData} from '../../constants/store';
import { GlobalContext } from '../../context/GlobalState';

const ChatScreen = ({navigation}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const {token,user,updateMessages,messages} = useContext(GlobalContext);

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
			return `${diff} mins ago`;
		}
		else if(diff > 60 && diff < 1440){
			return `${parseInt(diff/60)} hrs ago`
		}
		else if(diff > 1440 && diff < 10800){
			return `${parseInt(diff/1440)} days ago`
		}
		else if(diff > 10080 && diff < 43200){
			return `${parseInt(diff/10080)} weeks ago`
		}
		else if(diff > 43200 && diff < 518400){
			return `${parseInt(diff/43200)} months ago`
		}
		else{
			return `${diff} secs ago`
		}
	}

	useEffect(() => {
		if(messages.length == 0){
			console.log("in")
			axios.get(`${userApiUrl}/messages/getMessages`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then(async (res) => {
				console.log(res.data,"from local messages");
				updateMessages(res.data);
				await AsyncStorage.setItem("messages",JSON.stringify(res.data));
			}).catch((err) => {
				console.log(err,"err");
				// if (Array.isArray(err.response.data.errors)) {
				// 	if (Platform.OS === 'android') {
				// 		ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
				// 	}
				// }
			})
		}
	},[])


	const renderer = ({item}) => {
		const pressChatBox = () => {
			navigation.navigate("MessagingScreen",{
				item
			})
		}

		console.log(item,"id");

		const sampleImage ="https://images.unsplash.com/photo-1624387832956-1a33ddb5f7f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2735&q=80";

		return (
			<View
				key={item._id}
				style={{
					flexDirection: 'column',
					margin: '2%',
					height: '10%',
				}}>
			
					<TouchableOpacity onPress={pressChatBox}
						style={{
							flexDirection: 'row',
						}}>
							
						<Image
							source={{uri: sampleImage}}
							style={{
								borderRadius: 20,
								left: 10,
								width: 50,
								height: 50,
							}}
						/>

						<View
							styel={{
								flex: 1,
							}}>
							<View
								style={{
									flexDirection: 'row',
								}}>
								<Text style={styles.options}>
									{item.to._id !== user._id ? 
										item.to.name.length > 30
										? item.to.name.substring(0, 30) +
										'...'
										: item.to.name
										: 
										(
										item.user.name.length > 30
										? item.user.name.substring(0, 30) +
										'...'
										: item.user.name
										)
									}
								</Text>
							</View>
							<View
								style={{
									maxWidth: '80%',
									flexDirection: 'row',
								}}>
								<Text

									style={{
										...styles.options,
										fontSize: 14,
										marginTop: 2,
										fontFamily: 'NotoSans-Regular',
									}}>
									{`${item.chat[item.chat.length-1].user._id === user._id ? "You" : item.chat[item.chat.length-1].user.name} shared ${item.chat[item.chat.length-1].message.trackName}, By ${item.chat[item.chat.length-1].message.artistName}`}.
								</Text>
								<Text
									style={{
										...styles.options,
										marginLeft:-10,
										marginTop: -25,
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
				colorOne: PRIMARY,
				colorTwo: ACCENT,
			}}>
			<View
				style={{
					marginTop: 30,
				}}>
				<SearchBox
					placeholder="Search Messages"
					searchQuery={searchQuery}
					setSearchQuery={search}
				/>
			</View>

			<Text
				style={{
					top: 5,
					fontSize: 18,
					color: 'white',
					marginBottom: 10,
					marginLeft: 20,
					letterSpacing: 0,
					fontFamily: 'NotoSans-Regular',
				}}>
				Messages
			</Text>
			<View>
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
						</>
					)
				}
			</View>
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
		marginLeft: 30,
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
