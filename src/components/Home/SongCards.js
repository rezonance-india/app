import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const SongCards = ({item}) => {
	const {album_image, track_name, artist_name} = item;
	return (
		<View style={styles.container}>
			<Image source={{uri: album_image}} style={styles.album} />

			<Text style={styles.text}>{track_name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 8,
		marginLeft: 12,
	},

	album: {
		width: (width * 4.2) / 10,
		height: (width * 4.2) / 10,
		borderRadius: 10,
	},
	text: {
		fontSize: 10,
		color: 'white',
		fontWeight: '600',
		alignSelf: 'center',
		marginTop: 8,
	},
});

export default SongCards;
