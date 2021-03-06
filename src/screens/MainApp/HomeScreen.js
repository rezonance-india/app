import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ACCENT, PRIMARY} from '../../constants/colors';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';


const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
	return (
		// <ScreenBuilder>
			<LinearGradient
				colors={[PRIMARY, ACCENT]}
				// locations={[0.2, 0.8]}
				// start={{ x: 0.0, y: 0 }}
				// end={{ x: 1, y: 0  }}
				useAngle={true} angle={145} angleCenter={{x:-0.02, y:-0.05}}
				// useAngle={true} angle={135} angleCenter={{x: 1, y: 1}}

				style={styles.linearGradient}>
				<View style={styles.greetingContainer}>
					<Text style={styles.greeting}>Good Evening!</Text>
					<Text
						style={{
							...styles.greeting,
							fontSize: 32
						}}>
						radioactive
					</Text>
				</View>
				<View></View>
			</LinearGradient>
		// </ScreenBuilder>		
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
		fontSize: 18
	},
});

export default HomeScreen;
