import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {defaultString} from '../Player/config';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#272829',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: width / 4,
		paddingVertical: 25,
	},
	text: {
		color: 'white',
	},
});

const MiniPlayer = () => {
	const [paused, setPaused] = useState(false);
	const [liked, setLiked] = useState(false);

	const onPressPlay = () => {
		setPaused((paused) => !paused);
	};

	const onPressLike = () => {
		setLiked((liked) => !liked);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onPressLike}>
				{liked ? (
					<Icon
						size={30}
						name="heart"
						style={[
							{
								color: defaultString.darkColor,
							},
						]}
					/>
				) : (
					<Icon
						size={30}
						name="heart-outline"
						style={[
							{
								color: defaultString.darkColor,
							},
						]}
					/>
				)}
			</TouchableOpacity>

			<Text style={styles.text}>Vertigo</Text>

			<TouchableOpacity onPress={onPressPlay}>
				{!paused ? (
					<Icon
						size={30}
						name="pause-outline"
						style={{
							color: defaultString.darkColor,
						}}
					/>
				) : (
					<Icon
						size={30}
						name="play-outline"
						style={{
							color: defaultString.darkColor,
						}}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default MiniPlayer;
