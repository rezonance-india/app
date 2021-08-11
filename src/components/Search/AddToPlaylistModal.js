import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState,useContext} from 'react';
import {Modal, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import { userApiUrl } from '../../constants/config';
import {userData} from '../../constants/store';
import { GlobalContext } from '../../context/GlobalState';
import SearchBox from '../Search/SearchBox';
import LinearGradientComp from '../Shared/LinearGradient';

const AddToPlayListModal = ({modalVisible, toggleVisibility,selectedSong}) => {
    const {user,updateUser} = useContext(GlobalContext);
	console.log(user,"user");

	console.log(selectedSong,"selected song");

	const {album_image,track_name,track_url,artist_name} = selectedSong

    let playlistNames = [];

    //Saving the playlist names
    user.playlists.map((playlist) => {
        playlistNames.push(playlist.name);
    })

    const [searchQuery, setSearchQuery] = useState('');
	const [searchResults,setSearchResults] = useState(playlistNames);

    const search = (value) => {
        //Searching using regex
        let re = new RegExp(`^${value}`);

        let results = [];

        playlistNames.map((playlist) => {
            if(playlist.match(re)){
                results.push(playlist);
                setSearchResults(results);
            }
        })
	};

	const playlistData = {
		trackName:track_name,
		artistName:artist_name,
		playlistName:"lol",
		albumArt:album_image,
		trackUrl:track_url
	}

	const addToPlaylist = (playlist) => {
		console.log(playlist,"playlist");
		axios.post(`${userApiUrl}/songs/addSong`,
        {
			...playlistData,
			playlistName:playlist,
			userId:user._id
        })
        .then(async (res) => {
            console.log(res.data,"add song in the playlist");
            updateUser(res.data);
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
			ToastAndroid.show("Song added", ToastAndroid.SHORT);
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
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
			<LinearGradientComp
				bgcolors={{
					colorOne: 'rgba(0, 0, 0, 0.3)',
					colorTwo: 'rgba(0, 0, 0, 1)',
				}}>
				<View>
					<View style={styles.modalView}>
						<SearchBox
							placeholder="Search Playlists"
							searchQuery={searchQuery}
							setSearchQuery={search}
						/>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={{
								color: 'white',
							}}>
							{searchResults && searchResults.map((playlist, i) => (
                                    <View
                                        key={i}
                                        style={{
                                            flexDirection: 'column',
                                            alignContent: 'space-between',
                                            margin: '2%',
                                        }}>

										<TouchableOpacity onPress={() => addToPlaylist(playlist)}>
											<View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                            }}>
												<Image
													source={{uri: "https://i.scdn.co/image/ab67616d0000b27388b3414802727efbacf8dc43"}}
													style={{
														left: 10,
														width: 50,
														height: 50,
													}}
												/>
												<Text style={styles.options}>
													{playlist}
												</Text>
                                        </View>	
										</TouchableOpacity>
                                        
                                    </View>
                                )        
                            )}
						</ScrollView>
					</View>
				</View>
			</LinearGradientComp>
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
		fontWeight: 'bold',
		fontFamily: 'Open Sans',
		fontSize: 16,
		marginTop: 7.5,
		marginLeft: -10,
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

export default AddToPlayListModal;
