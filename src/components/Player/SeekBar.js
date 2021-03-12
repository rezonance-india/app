import React, {Component} from 'react';

import {defaultString} from './config';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Slider from '@react-native-community/slider';

function pad(n, width, z = 0) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
	pad(Math.floor(position / 60), 2),
	pad(position % 60, 2),
];

const SeekBar = ({trackLength, currentPosition, onSeek, onSlidingStart}) => {
	const elapsed = minutesAndSeconds(currentPosition);
	const remaining = minutesAndSeconds(trackLength - currentPosition);
	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row'}}>
				<Text style={[styles.text, {color: defaultString.darkColor}]}>
					{elapsed[0] + ':' + elapsed[1]}
				</Text>
				<View style={{flex: 1}} />
				<Text
					style={[
						styles.text,
						{width: 40, color: defaultString.darkColor},
					]}>
					{trackLength > 1 && '-' + remaining[0] + ':' + remaining[1]}
				</Text>
			</View>
			<Slider
				style={styles.slider}
				maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
				onSlidingStart={onSlidingStart}
				onSlidingComplete={onSeek}
				value={currentPosition}
				minimumTrackTintColor="#fff"
				maximumTrackTintColor="#fff"
				thumbTintColor="#fff"
				animateTransitions="true"
			/>
		</View>
	);
};

export default SeekBar;

const styles = StyleSheet.create({
	text: {
		color: 'rgba(255, 255, 255, 0.72)',
		fontSize: 12,
		textAlign: 'center',
	},
	slider: {
		height: '10%',

	},
});
