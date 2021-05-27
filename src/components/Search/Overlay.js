import React, {useContext} from 'react';
import {
	Modal,
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import LinearGradient from '../Shared/LinearGradient';
import Icon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import {useState} from 'react';
import {TRACKS} from '../Player/tracksData';
import {GlobalContext} from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Overlay = ({toggleVisibility, modalVisible, data, selectedSong}) => {
	const [liked, setLiked] = useState(false);
	const [heartIcon, setHeartIcon] = useState('heart-outline');
	const {queue, updateQueue} = useContext(GlobalContext);

	const options = [
		{
			name: 'Like',
			icon_name: heartIcon,
			onPress: () => {
				setLiked(!liked);
				liked ? setHeartIcon('heart') : setHeartIcon('heart-outline');
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
					albumArtUrl: selectedSong.album_image,
					audioUrl: selectedSong.track_url,
				});
				updateQueue(trackDetails);

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
			onPress: () => {},
		},
		{
			name: 'Add to Playlist',
			icon_name: 'list-outline',
			onPress: () => {},
		},
		{
			name: 'View artist',
			icon_name: 'person-outline',
			onPress: () => {},
		},
		{
			name: 'Similar Songs',
			icon_name: 'layers-outline',
			onPress: () => {},
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
