import React from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ACCENT, PRIMARY} from '../../constants/colors';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
	return (
		// <ScreenBuilder>
		<LinearGradient
			colors={[PRIMARY, ACCENT]}
			useAngle={true}
			angle={145}
			angleCenter={{x: -0.02, y: -0.05}}
			style={styles.linearGradient}>
			<View style={{marginHorizontal: 15, marginVertical: 10}}>
				<View style={styles.greetingContainer}>
					<Text style={styles.greeting}>Good Evening!</Text>
					<Text
						style={{
							...styles.greeting,
							fontSize: 32,
						}}>
						radioactive
					</Text>
				</View>
			</View>
			<TextInput
				style={{backgroundColor: 'red'}}
				onChange={(value) => console.log(value.value, 'lol')}
			/>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		// minHeight: height,
		// paddingTop: 30,
	},
	greetingContainer: {
		justifyContent: 'space-between',
		flex: 0.08,
		marginTop: 50,
		paddingTop: height / 25,
		paddingLeft: width / 12,
	},
	greeting: {
		color: '#ffffff',
		fontFamily: 'OpenSans',
		width: width / 1.5,
		fontSize: 18,
	},
});

export default HomeScreen;
