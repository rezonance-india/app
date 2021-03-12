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
					width: '80%',
					height: '70%',
					borderRadius: 20,
				}}></Image>
			<Text
				style={{
					...styles.text,
					width: '100%',
					textAlign: 'center',
					paddingTop: '5%',
					fontWeight: 'bold',
					fontSize: 20,
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
	},
});

export default TrackDetails;
