import React, {useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ACCENT, PRIMARY} from '../../constants/colors';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import SongContainer from '../../components/Home/SongContainer';
import {rp, rfu, trending} from '../../constants/dummydata';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
	const titles = ['Recently Played', 'Recommended For You', 'Trending'];

	const renderSongs = () => {
		return titles.map((title, i) => (
			<SongContainer
				songtitles={title}
				rp={rp}
				rfu={rfu}
				trending={trending}
				key={i}
			/>
		));
	};

	return (
		<LinearGradient
			height="100%"
			colors={[PRIMARY, ACCENT]}
			useAngle={true}
			angle={145}
			angleCenter={{x: -0.02, y: -0.05}}
			style={styles.linearGradient}>
			<ScrollView>
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
					<View>
						{titles.map((title, i) => (
							<View></View>
						))}
					</View>
					{renderSongs()}
				</View>
			</ScrollView>
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
		marginBottom: 20,
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
