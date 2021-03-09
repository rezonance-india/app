import React from 'react';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import {Text, View, Image, StyleSheet} from 'react-native';
import LinearGradient from '../../components/Shared/LinearGradient';
import {ACCENT, PRIMARY} from '../../constants/colors';

const PlayerScreen = ({route}) => {
	const {album_image, artist_name, track_name} = route.params;
	return (
		<LinearGradient
			bgcolors={{
				PRIMARY,
				ACCENT,
			}}>
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
						height: '50%',
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
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	text: {
		color: 'white',
		paddingTop: '6%',
	},
});
export default PlayerScreen;
