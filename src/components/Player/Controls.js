import React, {Component} from 'react';
import {defaultString} from './config';
import Icon from 'react-native-vector-icons/Ionicons';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Controls = ({
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
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0} onPress={onPressShuffle}>
				<Icon
					size={40}
					name="shuffle-outline"
					style={[
						{color: defaultString.darkColor},
						styles.secondaryControl,
						shuffleOn ? [] : styles.off,
					]}
				/>
			</TouchableOpacity>

			<View style={{width: 40}} />
			<TouchableOpacity onPress={onBack} disabled={backwardDisabled}>
				<Icon
					size={40}
					name="play-skip-back-circle-outline"
					style={[
						{color: defaultString.darkColor},
						backwardDisabled && {opacity: 0.3},
					]}
				/>
			</TouchableOpacity>

			<View style={{width: 20}} />
			{!paused ? (
				<TouchableOpacity onPress={onPressPause}>
					<View style={styles.playButton}>
						<Icon
							size={40}
							name="pause-outline"
							style={{
								color: defaultString.darkColor,
								fontSize: 30,
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

			<View style={{width: 20}} />
			<TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
				<Icon
					size={40}
					name="play-skip-forward-circle-outline"
					style={[
						forwardDisabled && {opacity: 0.3},
						{color: defaultString.darkColor},
					]}
				/>
			</TouchableOpacity>
			<View style={{width: 40}} />

			<TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
				<Icon
					size={40}
					name="repeat-outline"
					style={[
						{color: defaultString.darkColor},
						styles.secondaryControl,
						repeatOn ? [] : styles.off,
					]}
				/>
			</TouchableOpacity>
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
		borderColor: defaultString.darkColor,
		borderRadius: 72 / 2,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	secondaryControl: {
		bottom: '70%',
	},
	off: {
		opacity: 0.3,
	},
});
