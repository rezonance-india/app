import React, {useContext, useState} from 'react';
import {ScrollView, FlatList, Text, View,StyleSheet, TextInput} from 'react-native';
import ListItem from '../../components/Search/ListItem';
import axios from 'axios';
import {apiUrl} from '../../constants/config';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBox from '../../components/Search/SearchBox';
import {GlobalContext} from '../../context/GlobalState';
import LinearGradientComp from '../Shared/LinearGradient';

const SongSearch = ({navigation}) => {
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSong, setSelectedSong] = useState({});
	const [disable, setDisable] = useState(false);
	const {queue, updateQueue,selectedTrack,play} = useContext(GlobalContext);
	const [filler,setFiller] = useState(true);

	const renderer = ({item}) => (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => {
				setSelectedSong(item);
				if (disable) {
				} else {
					const trackDetails = queue;
					trackDetails[selectedTrack] = {
							title: item.track_name,
							artist: item.artist_name,
							artwork: item.album_image,
							url: item.track_url,
							id: item.ref_id,
						};
						updateQueue(trackDetails);
						const persistingData = async () => {
							await AsyncStorage.setItem(
								'queue',
								JSON.stringify(trackDetails),
						);
					};
					persistingData();

					navigation.navigate("PlayerScreen");
				}	
			}}>
			<ListItem
				toggleDisability={setDisable}
				navigation={navigation}
				selectedSong={selectedSong}
				data={item}
				navig={navigation}
			/>
		</TouchableOpacity>
	);

	const search = _.debounce((value) => {
		console.log(value, 'value');
		if (value.length === 0) {
			setResult([]);
			setFiller(true);
		}
		if (value.length !== 0) {
			setFiller(false);
			axios
				.post(
					`${apiUrl}search/tracks`,
					{
						query: value,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				)
				.then((res) => {
					setResult(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, 500);

	return (
		<LinearGradientComp
			bgcolors={{
				colorOne: "rgb(15, 15, 15)",
				colorTwo: "rgb(15, 15, 15)",
			}}> 
			<View
				style={{
					marginTop: 20,
				}}>
				<SearchBox
					placeholder="Search Artists/Songs"
					searchQuery={searchQuery}
					setSearchQuery={search}
					navigation={navigation}
				/>
			</View>
			{
				result.length === 0 && !filler ? (		
					<View style={styles.styleView}>
							<Text style={styles.text}>No search results</Text>
					</View>			
				):(
					filler ? (
						<>
						<View style={styles.styleView}>
							<Text style={styles.text}>Nothing to show</Text>
							<Text style={styles.text}>Search Something maybe?</Text>
						</View>
						</>
					):(
						<>
							<FlatList
								keyExtractor={(item) => item.ref_id}
								data={result}
								renderItem={renderer}
								showsVerticalScrollIndicator={false}
							/>
						</>
					)
				)
			}
		</LinearGradientComp>
	);
};

export default SongSearch;

const styles = StyleSheet.create({
	styleView:{
		justifyContent:'center',
		alignContent:'center',
	},
	text:{
		marginTop:"20%",
		marginLeft:"20%",
		fontSize:24,
		color:"white"
	}
})