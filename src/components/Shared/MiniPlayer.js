import React, {useContext, useEffect, useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalContext} from '../../context/GlobalState';
import {defaultString} from '../Player/config';
import MusicControl from 'react-native-music-control'

const {width, height} = Dimensions.get('window');
	
const MiniPlayer = ({nav}) => {
	const [liked, setLiked] = useState(false);
	const {queue,selectedTrack,updatePausedState,pausedState} = useContext(GlobalContext);
	
	const onPressPlay = () => {
		updatePausedState(false);
		MusicControl.updatePlayback({
			state: MusicControl.STATE_PLAYING,
		})
	};
	
	const onPressPause = () => {
		MusicControl.updatePlayback({
			state: MusicControl.STATE_PAUSED,
		})
		updatePausedState(true);
	}

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
						width: 50,
						height: 50,
						borderRadius: 8,
						marginLeft: 8,
					}}
					source={{
						uri: queue[selectedTrack].artwork,
					}}
					/>
				<View
					style={{
						marginLeft: 15,
					}}>
					<Text
						style={{
							...styles.text,
							fontSize: 16,
							paddingBottom: 2,
							fontWeight: 'bold',
						}}>
						{queue[selectedTrack].title.length > 20
							? queue[selectedTrack].title.substring(0, 20) + '...'
							: queue[selectedTrack].title}
					</Text>
					<Text style={styles.text}>
						{queue[selectedTrack].artist.length > 20
							? queue[selectedTrack].artist.substring(0, 20) + '...'
							: queue[selectedTrack].artist}
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

					{!pausedState ? 
					(
						<TouchableOpacity onPress={onPressPause}>
							<Icon
								size={30}
								name="pause-outline"
								style={{
									color: defaultString.darkColor,
								}}
							/>
						</TouchableOpacity>
					) : 
					(
						<TouchableOpacity onPress={onPressPlay}>
							<Icon
								size={30}
								name="play-outline"
								style={{
									color: defaultString.darkColor,
								}}
							/>
						</TouchableOpacity>
					)}
			</View>
		</View>
	);
};

export default MiniPlayer;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		flexDirection: 'row',
		backgroundColor: '#26282b',
		borderRadius: 10,
		// marginBottom: 2,
	},
	mainContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 12,
		letterSpacing: 0.5,
		fontFamily: 'NotoSans-Regular',
	},
});
