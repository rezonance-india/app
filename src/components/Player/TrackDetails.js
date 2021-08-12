import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const TrackDetails = (props) => {
	const {album_image, artist_name, track_name} = props;
	return (
		<View
			style={{
				flex: 1,
				marginTop: '15%',
				alignItems: 'center',
			}}>
			<Image
				source={{uri: album_image}}
				style={{
					flex: 0.8,
					aspectRatio: 1,
					borderRadius: 20,
				}}></Image>
			<Text
				style={{
					...styles.text,
					width: '100%',
					textAlign: 'center',
					paddingTop: '5%',
					fontWeight: 'bold',
					fontSize: 22,
					fontFamily: 'NotoSans-Bold',
					letterSpacing: 1,
				}}>
				{track_name}
			</Text>
			<Text style={{...styles.text, fontSize: 17}}>{artist_name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		color: 'white',
		paddingTop: '3%',
		fontFamily: 'NotoSans-Regular',
	},
});

export default TrackDetails;
