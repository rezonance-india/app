import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useContext} from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { GlobalContext } from '../../context/GlobalState';
const {width, height} = Dimensions.get('window');

const SongCards = ({item, navigation,rp}) => {
	const {album_image, track_name, artist_name,artwork,title,artist,track_url,url,id,ref_id} = item;
	const {queue,updateQueue,selectedTrack} = useContext(GlobalContext);

	const playSong = () => {
		const trackDetails = queue;

		trackDetails[selectedTrack] = {
			title: rp ? title : track_name,
			artist: rp ? artist : artist_name,
			artwork: rp ? artwork : album_image,
			url:rp ? url : track_url,
			id: rp ? id : ref_id,
		};

		updateQueue(trackDetails);

		const persistingData = async () => {
			await AsyncStorage.setItem(
				'queue',
				JSON.stringify(trackDetails),
			);
		};

		persistingData();

		navigation.navigate("PlayerScreen");
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={playSong}>
				<ImageBackground
					source={{uri: rp ? artwork : album_image}}
					style={styles.album}
					imageStyle={{borderRadius: 10}}>
					<View
						style={{
							height: '25%',
							top: '75%',
							width: '100%',
							backgroundColor: '#000',
							opacity: 0.65,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						}}></View>

					<Text
						style={{
							...styles.text,
							fontSize: 15,
							fontFamily: 'NotoSans',
							fontWeight: 'bold',
						}}>
						{rp  ? 
							title.length > 20
							? title.substring(0, 20) +
							'...'
							: title
							: 
							(
							track_name.length > 20
							? track_name.substring(0, 20) +
							'...'
							: track_name
							)
						}
					</Text>
					<Text style={styles.text}>
						{rp  ? 
							artist.length > 20
							? artist.substring(0, 20) +
							'...'
							: artist
							: 
							(
							artist_name.length > 20
							? artist_name.substring(0, 20) +
							'...'
							: artist_name
							)
						} 
					</Text>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 8,
		marginLeft: 12,
	},

	album: {
		width: (width * 4.6) / 10,
		height: (width * 4.6) / 10,
	},
	text: {
		fontSize: 12,
		top: '52%',
		color: 'white',
		fontFamily: 'NotoSans-Regular',
		marginHorizontal: 8,
		marginTop: 2,
	},
});

export default SongCards;
