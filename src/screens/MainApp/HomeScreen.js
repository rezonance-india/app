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
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import SongContainer from '../../components/Home/SongContainer';
import {rp, rfu, trending} from '../../constants/dummydata';
import MiniPlayer from '../../components/Shared/MiniPlayer';
import {GlobalContext} from '../../context/GlobalState';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
	const titles = ['Recently Played', 'Recommended For You', 'Trending'];
	const {queue} = useContext(GlobalContext);

	console.log(queue,"global queue");

	const imageUrl = "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80";

	const goToProfile = () => {
		console.log("ok");
		navigation.navigate("ProfileScreen",{
			imageUrl
		})
	}

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
								<Text style={styles.greeting}>Good Evening!</Text>
								<TouchableOpacity onPress={goToProfile}>
								<Image
									source={{uri: imageUrl}}
									style={{
										top:-10,
										borderRadius: 35,
										width: 70,
										height: 70,
								}} />
								</TouchableOpacity>
							</View>
						<Text
							style={{
								...styles.greeting,
								marginTop:-45,
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
		marginLeft:-10
	},
});

export default HomeScreen;
