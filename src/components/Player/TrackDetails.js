import React from 'react';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import {Text, View, Image, StyleSheet} from 'react-native';
import LinearGradient from '../../components/Shared/LinearGradient';
import {ACCENT, PRIMARY} from '../../constants/colors';

const TrackDetails = (props) => {
	const {album_image, artist_name, track_name} = props;
	return (
		<View
			style={{
				flex: 1,
				marginTop: '25%',
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
					fontWeight: 'bold',
					fontSize: 20,
				}}>
				{track_name}
			</Text>
			<Text style={styles.text}>{artist_name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		color: 'white',
		paddingTop: '5%',
	},
});

export default TrackDetails;
