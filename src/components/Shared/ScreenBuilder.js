import React from 'react';
import {Dimensions, Platform, StatusBar} from 'react-native';
import {View, Text} from 'react-native';
import {colors} from '../../constants/colors';

const {width, height} = Dimensions.get('window');

const ScreenBuilder = (props) => {
	return (
		<View
			style={{
				minHeight: height,
				paddingTop:
					Platform.OS === 'android' ? StatusBar.currentHeight : 30,
				backgroundColor: colors.background,
			}}>
			<View style={{marginHorizontal: 15, marginVertical: 10}}>
				{props.children}
			</View>
		</View>
	);
};

export default ScreenBuilder;
