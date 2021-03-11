import React, {useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	ScrollView,
} from 'react-native';
import LinearGradient from '../../components/Shared/LinearGradient';
import {ACCENT, PRIMARY} from '../../constants/colors';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import SongContainer from '../../components/Home/SongContainer';
import {rp, rfu, trending} from '../../constants/dummydata';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
	const titles = ['Recently Played', 'Recommended For You', 'Trending'];

	const renderSongs = () => {
		return titles.map((title, i) => (
			<SongContainer
				navigation={navigation}
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
			bgcolors={{
				colorOne: PRIMARY,
				colorTwo: ACCENT,
			}}>
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
					{renderSongs()}
				</View>
			</ScrollView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	// linearGradient: {
	// 	flex: 1,
	// 	// minHeight: height,
	// 	// paddingTop: 30,
	// },
	greetingContainer: {
		justifyContent: 'space-between',
		flex: 0.08,
		marginTop: 50,
		marginBottom: 20,
		paddingLeft: width / 12,
	},
	greeting: {
		color: '#ffffff',
		fontFamily: 'sans-serif',
		width: width / 1.5,
		fontSize: 18,
	},
});

export default HomeScreen;
