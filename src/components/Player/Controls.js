import React, {Component, useState} from 'react';
import {defaultString} from './config';
import Icon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ChatModal from '../Shared/ChatModal';
import Recommend from '../Shared/Recommend';

const Controls = ({
	liked,
	onPressLike,
	paused,
	shuffleOn,
	repeatOn,
	onPressPlay,
	onPressPause,
	onBack,
	onForward,
	onPressShuffle,
	onPressRepeat,
	backwardDisabled,
	forwardDisabled,
	navig
}) => {
	const [chatModalVisible, setChatModalVisible] = useState(false);
	const [recommendModalVisible, setRecommendModalVisible] = useState(false);

	return (
		<View style={styles.container}>
			<View>
				<ChatModal
					toggleVisibility={setChatModalVisible}
					modalVisible={chatModalVisible}
				/>
				<Recommend
					navig={navig}
					toggleVisibility={setRecommendModalVisible}
					modalVisible={recommendModalVisible}
				/>
				<View
					style={{
						width: '100%',
						bottom: '10%',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}>
					<TouchableOpacity
						activeOpacity={0}
						onPress={onPressShuffle}>
						<Icon
							size={30}
							name="download-outline"
							style={[
								{color: defaultString.darkColor},
								shuffleOn ? [] : styles.off,
							]}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							console.log('lol');
							onPressLike();
						}}>
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

					<TouchableOpacity
						onPress={() => {
							setRecommendModalVisible(true);
						}}>
						<OctIcon
							size={30}
							name="versions"
							style={[{color: defaultString.darkColor}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							console.log('sending to the moon');
							setChatModalVisible(true);
						}}>
						<Icon
							size={30}
							name="rocket-outline"
							style={[{color: defaultString.darkColor}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.0}
						onPress={onPressRepeat}>
						<Icon
							size={30}
							name="repeat-outline"
							style={[
								{color: defaultString.darkColor},
								repeatOn ? [] : styles.off,
							]}
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						marginLeft: '20%',
						top: '5%',
						width: '60%',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}>
					<TouchableOpacity
						onPress={onBack}
						disabled={backwardDisabled}>
						<Icon
							size={40}
							name="play-skip-back-circle-outline"
							style={[
								{
									color: defaultString.darkColor,
								},
								backwardDisabled && {opacity: 0.3},
							]}
						/>
					</TouchableOpacity>
					{!paused ? (
						<TouchableOpacity onPress={onPressPause}>
							<View style={styles.playButton}>
								<Icon
									size={40}
									name="pause-outline"
									style={{
										color: defaultString.darkColor,
									}}
								/>
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={onPressPlay}>
							<View style={styles.playButton}>
								<Icon
									size={40}
									name="play-outline"
									style={{
										color: defaultString.darkColor,
										marginLeft: 5,
									}}
								/>
							</View>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						onPress={onForward}
						disabled={forwardDisabled}>
						<Icon
							size={40}
							name="play-skip-forward-circle-outline"
							style={[
								forwardDisabled && {opacity: 0.3},
								{color: defaultString.darkColor},
							]}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Controls;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '15%',
	},
	playButton: {
		height: 72,
		width: 72,
		bottom: '15%',
		borderColor: defaultString.darkColor,
		borderRadius: 72 / 2,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	off: {
		opacity: 0.3,
	},
});
