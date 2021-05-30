import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
} from 'react-native';
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
						fontSize: 15,
						fontFamily: 'NotoSans',
						fontWeight: 'bold',
					}}>
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
		fontFamily: 'NotoSans-Regular',
		marginHorizontal: 8,
		marginTop: 2,
	},
});

export default SongCards;
