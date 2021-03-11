import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
} from 'react-native';
import {BlurView} from 'expo-blur';
const {width, height} = Dimensions.get('window');

const SongCards = ({item, navigation}) => {
	const {album_image, track_name, artist_name} = item;
	return (
		<View style={styles.container}>
			<ImageBackground
				source={{uri: album_image}}
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
						fontWeight: 'bold',
						fontSize: 15,
					}}
					// onPress={() => {
					// 	console.log('lol');
					// 	navigation.navigate('PlayerScreen', {
					// 		album_image,
					// 		track_name,
					// 		artist_name,
					// 	});
					// }}
				>
					{track_name}
				</Text>
				<Text style={styles.text}>{artist_name} </Text>
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
		top: '52%',
		color: 'white',
		fontFamily: 'sans-serif',
		fontWeight: '600',
		marginVertical: 2,
		marginHorizontal: 8,
	},
});

export default SongCards;
