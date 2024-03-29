import React, {useContext, useEffect,useState} from 'react';
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
import {ACCENT} from '../../constants/colors';
import SongContainer from '../../components/Home/SongContainer';
import MiniPlayer from '../../components/Shared/MiniPlayer';
import {GlobalContext} from '../../context/GlobalState';
import { apiUrl } from '../../constants/config';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
	
	const {queue,user,selectedTrack} = useContext(GlobalContext);

	const titles = queue.length > 0 ? 
	['Trending','Recommended For You','Recently Played'] : ['Trending','Recommended For You'];

	const [rp,setRp] = useState([]);
	const [rfu,setRfu] = useState([]);
	const [trending,setTrending] = useState([]); 

	useEffect(() => {
		const rfuName= [];

		axios
		.get(
			`${apiUrl}trending/tracks`
		)
		.then((res) => {
			const result = res.data;
			
			const trendingName= [];

			for(let i=0,j=5;i<5,j<10;i++,j++){
				trendingName[i] = result[i];
				rfuName[j-5] = result[j];
			}

			setTrending(trendingName);

		}).catch((err) => {
			console.log(err);
		})

		if(queue.length > 0) {
			if(queue[selectedTrack].id === "trending"){
				setRfu(rfuName);
				console.log("lol sorry");
			}
			else{
				axios
					.post(
						`${apiUrl}recommend`,
						{
							ref_id: queue[selectedTrack].id,
						},
						{
							headers: {
								'Content-Type': 'application/json',
							},
						},
					)
					.then((res) => {
						setRfu(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}else{
			setRfu(rfuName);
		}

	},[queue])

	const renderSongs = () => {
		return titles.map((title, i) => (
			<SongContainer
				trending={trending}
				rfu={rfu}
				navigation={navigation}
				songtitles={title}
				key={i}
			/>
		));
	};

	return (
		<LinearGradient
			bgcolors={{
				// colorOne: PRIMARY,
				// colorTwo: ACCENT,
				colorOne: "rgb(16, 16, 16)",
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
								<Text style={{...styles.greeting,marginLeft:-60}}>Greetings ✨</Text>
							</View>
						<Text
							style={{
								...styles.greeting,
								fontSize: 32,
								fontFamily: 'NotoSans-Bold',
							}}>
							{user ? user.username : ""}
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
		marginTop: height/15,
		marginBottom: height/50,
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
