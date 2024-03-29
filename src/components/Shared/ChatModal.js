import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { result } from 'lodash';
import React, {useState,useContext,useEffect} from 'react';
import {Modal, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import { userApiUrl } from '../../constants/config';
import {userData} from '../../constants/store';
import { GlobalContext } from '../../context/GlobalState';
import SearchBox from '../Search/SearchBox';
import InputBox from './InputBox';
import LinearGradient from './LinearGradient';

const ChatModal = ({modalVisible, toggleVisibility,selectedSong}) => {
	const [searchQuery, setSearchQuery] = useState(null);	
	const {user,updateUser,updateMessages,token} = useContext(GlobalContext);
	const [isSending,setIsSending] = useState({});
	
	const [searchResults,setSearchResults] = useState([]);
	
	const {album_image,track_name,track_url,artist_name,track_id} = selectedSong;
	
	console.log(user,"user");

	useEffect(() => {
		if(searchQuery == null){
			setSearchResults(user.friends);
		}
	},[])

	
	const search = (value) => {
        //Searching using regex

        let re = new RegExp(value, "i")

		let results = [];
		
        user.friends.map((friend) => {
			console.log("lol");
            if(friend.username.match(re)){
                results.push(friend);
                setSearchResults(results);
            }
			else if(value == ""){
				results.push(friend);
                setSearchResults(results);
			}
			else{
				setSearchResults([]);
				console.log("lol");
			}
        })
	};

	const playlistData = {
		trackName:track_name,
		artistName:artist_name,
		albumArt:album_image,
		to:"lol",
		trackUrl:track_url,
		track_id
	}

	const sendSong = (userId) => {
		setIsSending({
			id:userId._id,
			switch:true
		});
		
		axios.post(`${userApiUrl}/messages/send`,
        {
			...playlistData,
			to:userId._id,
        },{
			headers: {
				Authorization: "Bearer " + token,
			},
		})
        .then(async (res) => {
			setIsSending({
				id:userId._id,
				switch:false
			});
			ToastAndroid.show("Song sent", ToastAndroid.SHORT);
			//?Todo remove this request later on and optimize in single request only
			axios.get(`${userApiUrl}/messages/getMessages`,{
				headers: {
					Authorization: "Bearer " + token,
				}
			}
			)
			.then(async (res) => {
				console.log(res.data,"from local messages");
				updateMessages(res.data);
				await AsyncStorage.setItem("messages",JSON.stringify(res.data));
			}).catch((err) => {
				console.log(err,"err");
			})
        }).catch((err) => {
            console.log(err,"err");
			setIsSending({
				id:userId._id,
				switch:false
			});
            if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show("Error sending the message", ToastAndroid.SHORT);
                }
            }
        })
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
			<LinearGradient
				bgcolors={{
					colorOne: 'rgba(0, 0, 0, 0.25)',
					colorTwo: 'rgba(0, 0, 0, 1)',
				}}>
				<View>
					<View style={styles.modalView}>
						<SearchBox
							placeholder="Search Friends"
							searchQuery={searchQuery}
							setSearchQuery={search}
						/>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={{
								color: 'white',
							}}>
							{searchResults.map((user, i) => (
								<View
									key={i}
									style={{
										flexDirection: 'column',
										alignContent: 'space-between',
										margin: '2%',
									}}>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'flex-start',
										}}>
										<Image
											source={{"uri": user.photo}}
											style={{
												borderRadius: 20,
												left: 10,
												width: 50,
												height: 50,
											}}
										/>
										<Text style={styles.options}>
											{user.username}
										</Text>
										<View
											style={{
												flex: 1,
												flexDirection: 'row',
												justifyContent: 'flex-end',
												marginRight: 20,
											}}>
											<TouchableOpacity onPress={() => sendSong(user)}>
												<View style={styles.button}>
													<Text style={styles.textButton}>
														{
															isSending.id === user._id && isSending.switch ? "Sending" : "Send"
														}
													</Text>
												</View>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							))}
						</ScrollView>
					</View>
				</View>
			</LinearGradient>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		marginTop: '100%',
		width: '100%',
		height: '50%',
	},
	options: {
		color: 'white',
		left: 70,
		fontFamily: 'NotoSans-Bold',
		fontSize: 18,
		marginTop: 7.5,
		marginLeft: -20,
	},
	button: {
		backgroundColor: '#09a0eb',
		// backgroundColor: '#7200ca',
		height: 35,
		width: 70,
		opacity: 0.8,
		borderRadius: 5,
		paddingVertical: 7.5,
		alignContent: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	textButton: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});

export default ChatModal;
