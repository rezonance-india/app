import React from "react"
import {View,Text,StyleSheet} from "react-native";
import Slider from '@react-native-community/slider';

const pad = (n, width, z = 0) => {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
	pad(Math.floor(position / 60), 2),
	pad((position % 60).toPrecision(2), 2),
];

const NewSeekBar = ({onSlidingComplete,onSlidingStart,currentPosition,trackLength,sliderValue}) => {
    
    const elapsed = minutesAndSeconds(currentPosition);
	const remaining = minutesAndSeconds(trackLength - currentPosition);
    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
				<Text style={[styles.text, {left: '80%'}]}>
					{elapsed[0] + ':' + elapsed[1]}
				</Text>
				<View style={{flex: 1}} />
				<Text style={[styles.text, {right: '50%'}]}>
					{trackLength > 1 && '-' + remaining[0] + ':' + remaining[1]}
				</Text>
			</View>
            <Slider
                style={{width: 400, height: 40}}
                minimumValue={0}
                maximumValue={1}
                value={sliderValue}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#fff"
                thumbTintColor="#fff"
                animateTransitions="true"
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSlidingComplete}
            />
        </View>
    )
}

export default NewSeekBar;

const styles = StyleSheet.create({
    container:{
        bottom:50,
    },
	text: {
		fontSize: 12,
		color:"white",
		paddingBottom: '1%',
	},
	slider: {
		height: '10%',
	},
});
