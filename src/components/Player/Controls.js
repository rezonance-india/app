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
	forwardDisabled,
}) => (
	<View style={styles.container}>
		<TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
			<Icon
				name="shuffle-outline"
				style={[
					{color: defaultString.darkColor},
					styles.secondaryControl,
					shuffleOn ? [] : styles.off,
				]}
			/>
		</TouchableOpacity>

		<View style={{width: 40}} />

		<TouchableOpacity onPress={onBack}>
			<Icon
				name="play-back-circle-outline"
				style={{color: defaultString.darkColor}}
			/>
		</TouchableOpacity>

		<View style={{width: 20}} />
		{!paused ? (
			<TouchableOpacity onPress={onPressPause}>
				<View style={styles.playButton}>
					<Icon
						name="pause-outline"
						style={{color: defaultString.darkColor}}
					/>
				</View>
			</TouchableOpacity>
		) : (
			<TouchableOpacity onPress={onPressPlay}>
				<View style={styles.playButton}>
					<Icon
						name="play-outline"
						style={{color: defaultString.darkColor}}
					/>
				</View>
			</TouchableOpacity>
		)}

		<View style={{width: 20}} />
		<TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
			<Icon
				name="play-skip-forward-outline"
				style={[
					forwardDisabled && {opacity: 0.3},
					{color: defaultString.darkColor},
				]}
			/>
		</TouchableOpacity>
		<View style={{width: 40}} />
		<TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
			<Icon
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
		borderWidth: 1,
		borderColor: defaultString.darkColor,
		borderRadius: 72 / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	secondaryControl: {
		height: 60,
		width: 60,
	},
	off: {
		opacity: 0.3,
	},
});
