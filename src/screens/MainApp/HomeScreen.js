import React, {useContext, useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	ScrollView,
	Image,
	TouchableOpacity
} from 'react-native';
import LinearGradient from '../../components/Shared/LinearGradient';
import {ACCENT, PRIMARY} from '../../constants/colors';
import SongContainer from '../../components/Home/SongContainer';
import {rp, rfu, trending} from '../../constants/dummydata';
import MiniPlayer from '../../components/Shared/MiniPlayer';
import {GlobalContext} from '../../context/GlobalState';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
	const titles = ['Recently Played', 'Recommended For You', 'Trending'];
	const {queue} = useContext(GlobalContext);

	console.log(queue,"global queue");


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
						<View 
							style={{
								flexDirection:"row",
								justifyContent:"space-around"
							}}>
								<Text style={{...styles.greeting,marginLeft:-60}}>Good Evening!</Text>
							</View>
						<Text
							style={{
								...styles.greeting,
								fontSize: 32,
								fontFamily: 'NotoSans-Bold',
							}}>
							radioactive
						</Text>
					</View>
					{renderSongs()}
				</View>
			</ScrollView>
			{queue && queue.length > 0 ? <MiniPlayer nav={navigation} /> : null}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	greetingContainer: {
		flex: 0.08,
		marginTop: 50,
		marginBottom: 20,
		paddingLeft: width / 12,
	},
	greeting: {
		color: '#ffffff',
		fontFamily: 'NotoSans-Regular',
		letterSpacing: 0.1,
		width: width / 1.5,
		fontSize: 20,
	},
});

export default HomeScreen;
