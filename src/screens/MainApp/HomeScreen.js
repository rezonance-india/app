import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ACCENT, PRIMARY} from '../../constants/colors';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
	return (
		<LinearGradient
			colors={[PRIMARY, ACCENT]}
			locations={[0.3, 0.8]}
			style={styles.linearGradient}>
			<View style={styles.greetingContainer}>
				<Text style={styles.greeting}>Good Evening!</Text>
				<Text
					style={{
						...styles.greeting,
						fontSize: 20,
					}}>
					radioactive
				</Text>
			</View>
			<View></View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
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
	},
});

export default HomeScreen;
