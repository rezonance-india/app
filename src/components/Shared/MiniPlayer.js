import React, {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
	Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {miniPlayerTrack} from '../../constants/store';
import {defaultString} from '../Player/config';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		flexDirection: 'row',
		backgroundColor: '#272829',
		marginBottom: 2,
	},
	mainContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 12,
		letterSpacing: 1,
	},
});

const MiniPlayer = ({nav}) => {
	const [paused, setPaused] = useState(false);
	const [liked, setLiked] = useState(false);

	const onPressPlay = () => {
		setPaused((paused) => !paused);
	};

	const onPressLike = () => {
		setLiked((liked) => !liked);
	};

	const openMiniPlayer = () => {
		nav.navigate('PlayerScreen');
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.mainContainer}
				onPress={openMiniPlayer}>
				<Image
					style={{
						width: 60,
						height: 50,
						borderColor: 'white',
						borderWidth: 2,
					}}
					source={{
						uri: miniPlayerTrack.image,
					}}
				/>
				<View
					style={{
						marginLeft: 20,
						alignItems: 'space-around',
					}}>
					<Text
						style={{
							...styles.text,
							fontSize: 16,
							paddingBottom: 2,
							fontWeight: 'bold',
						}}>
						{miniPlayerTrack.trackName}
					</Text>
					<Text style={styles.text}>
						{miniPlayerTrack.artistName}
					</Text>
				</View>
			</TouchableOpacity>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					width: 80,
					marginRight: 20,
					justifyContent: 'space-between',
				}}>
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
		</View>
	);
};

export default MiniPlayer;
