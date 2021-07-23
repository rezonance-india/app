import React, {useContext} from 'react';
import {
	Modal,
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import LinearGradient from '../Shared/LinearGradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatModal from "../Shared/ChatModal";
import Recommend from "../Shared/Recommend";
import axios from 'axios';
import { apiUrl } from '../../constants/config';
import AddToPlayListModal from './AddToPlaylistModal';

const Overlay = ({toggleVisibility, modalVisible, data, selectedSong,navig}) => {
	const [liked, setLiked] = useState(false);
	const [heartIcon, setHeartIcon] = useState('heart-outline');
	const [chatModalVisible, setChatModalVisible] = useState(false);
	const {queue, updateQueue} = useContext(GlobalContext);
	const [recommendModalVisible, setRecommendModalVisible] = useState(false);
	const [addToPlaylistModalVisible,setAddToPlaylistModalVisible] = useState(false);

	const options = [
		{
			name: 'Like',
			icon_name: heartIcon,
			onPress: () => {
				//Todo Async State updates
				setLiked(!liked);
				liked ? setHeartIcon('heart') : setHeartIcon('heart-outline');
				if(liked) {
					ToastAndroid.show("Added to liked songs",ToastAndroid.SHORT);
				}
				else {
					ToastAndroid.show("Removed from liked songs",ToastAndroid.SHORT);
				}
			},
		},
		{
			name: 'Add to queue',
			icon_name: 'add-outline',
			onPress: () => {
				const trackDetails = queue;
				trackDetails.push({
					title: selectedSong.track_name,
					artist: selectedSong.artist_name,
					artwork: selectedSong.album_image,
					url: selectedSong.track_url,
					id:selectedSong.ref_id
				});
				updateQueue(trackDetails);

				ToastAndroid.show("Added to queue",ToastAndroid.SHORT);

				const persistingData = async () => {
					await AsyncStorage.setItem(
						'queue',
						JSON.stringify(trackDetails),
					);
				};

				persistingData();
			},
		},
		{
			name: 'Send to Friends',
			icon_name: 'rocket-outline',
			onPress: () => {
				setChatModalVisible(true);
			},
		},
		{
			name: 'Add to Playlist',
			icon_name: 'list-outline',
			onPress: () => {
				setAddToPlaylistModalVisible(true);
			},
		},
		{
			name: 'View artist',
			icon_name: 'person-outline',
			onPress: () => {
				axios
				.post(
					`${apiUrl}search/artists`,
					{
						query: selectedSong.artist_name,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				)
				.then((result) => {
					axios
					.post(
						`${apiUrl}fetch/albums`,
						{
							artist_id: result.data[0].artist_id,
						},
						{
							headers: {
								'Content-Type': 'application/json',
							},
						},
					)
					.then((res) => {
						navig.navigate('ViewArtistScreen', {
							albumData: res.data,
							artist_id: result.data[0].artist_id,
							artist_image:result.data[0].artist_image,
							artist_name: result.data[0].artist_name,
						});
						toggleVisibility(false);
					})
					.catch((err) => {
						console.log(err);
					});
				})
				.catch((err) => {
					console.log(err);
				});
			},
		},
		{
			name: 'Similar Songs',
			icon_name: 'layers-outline',
			onPress: () => {
				setRecommendModalVisible(true);
			},
		},
	];

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
			
			<ChatModal
				selectedSong={selectedSong}
				toggleVisibility={setChatModalVisible}
				modalVisible={chatModalVisible}
			/>

			<Recommend
				selectedSong={selectedSong}
				navig={navig}
				toggleVisibility={setRecommendModalVisible}
				modalVisible={recommendModalVisible}
			/>

			<AddToPlayListModal
				selectedSong={selectedSong}
				navig={navig}
				toggleVisibility={setAddToPlaylistModalVisible}
				modalVisible={addToPlaylistModalVisible}
			/>

			<LinearGradient
				bgcolors={{
					colorOne: '#2d3436AF',
					colorTwo: '#000000FF',
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}>
							<Image
								source={{
									uri: selectedSong.album_image,
								}}
								style={{
									width: 200,
									borderRadius: 12,
									height: 200,
								}}
							/>
							<Text
								style={{
									color: 'white',
									paddingTop: 20,
									fontSize: 18,
									width: '100%',
									textAlign: 'center',
									fontWeight: 'bold',
								}}>
								{selectedSong.track_name}
							</Text>
							<Text
								style={{
									color: 'white',
									fontSize: 16,
									paddingTop: 15,
									width: '100%',
									textAlign: 'center',
									paddingBottom: 20,
								}}>
								{selectedSong.artist_name}
							</Text>
						</View>
						{options.map((option, i) => (
							<TouchableOpacity key={i} onPress={option.onPress}>
								<View
									style={{
										flexDirection: 'column',
										alignContent: 'space-between',
										margin: '4%',
									}}>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'flex-start',
										}}>
										<Icon
											name={option.icon_name}
											size={24}
											style={{left: 10}}
											color="white"
										/>
										<Text style={styles.options}>
											{option.name}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</LinearGradient>
		</Modal>
	);
};

export default Overlay;

const styles = StyleSheet.create({
	modalView: {
		marginTop: '30%',
		// width: '100%',
		// height: '150%',
	},
	options: {
		color: 'white',
		left: 70,
		fontFamily: 'Open Sans',
		fontSize: 16,
	},
});
