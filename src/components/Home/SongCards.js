import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SongCards = ({item}) => {
	const {album_image, track_name, artist_name} = item;
	return (
		<View style={styles.container}>
			<ImageBackground
				source={{uri: album_image}}
				style={styles.album}
				imageStyle={{borderRadius: 10}}>
				<View
					style={{
						height: '30%',
						top: '70%',
						width: '100%',
						backgroundColor: '#535353',
						opacity: 0.8,
					}}>
					<Text
						style={{
							...styles.text,
							fontWeight: 'bold',
							fontSize: 15,
						}}>
						{track_name}
					</Text>
					<Text style={styles.text}>{artist_name} </Text>
				</View>
			</ImageBackground>
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
		top: 0,
		color: 'white',
		fontWeight: '600',
		marginVertical: 4,
		marginHorizontal: 8,
	},
});

export default SongCards;
