import React, {useContext, useState} from 'react';
import {ScrollView, FlatList, Text, View, TextInput} from 'react-native';
import ListItem from '../../components/Search/ListItem';
import axios from 'axios';
import {apiUrl} from '../../constants/config';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBox from '../../components/Search/SearchBox';
import {GlobalContext} from '../../context/GlobalState';
import LinearGradientComp from '../Shared/LinearGradient';
import {colors} from '../../constants/colors';

const SongSearch = ({navigation}) => {
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSong, setSelectedSong] = useState({});
	const [disable, setDisable] = useState(false);
	const {queue, updateQueue} = useContext(GlobalContext);
	const renderer = ({item}) => (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => {
				setSelectedSong(item);
				if (disable) {
				} else {
					console.log('lol in queue');
					const trackDetails = queue;
					trackDetails[0] = {
						title: item.track_name,
						artist: item.artist_name,
						albumArtUrl: item.album_image,
						audioUrl: item.track_url,
					};
					updateQueue(trackDetails);
					const persistingData = async () => {
						await AsyncStorage.setItem(
							'queue',
							JSON.stringify(trackDetails),
						);
					};
					persistingData();
					navigation.navigate('PlayerScreen');
				}
			}}>
			<ListItem
				toggleDisability={setDisable}
				navigation={navigation}
				selectedSong={selectedSong}
				data={item}
			/>
		</TouchableOpacity>
	);
	const search = _.debounce((value) => {
		console.log(value, 'value');
		if (value.length === 0) {
			console.log('empty');
			setResult([]);
		}
		if (value.length !== 0) {
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
	// const searchHeader = () => <Type>Search</Type>;
	return (
		<LinearGradientComp
			bgcolors={{
				colorOne: colors.search,
				colorTwo: colors.search,
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
			<FlatList
				keyExtractor={(item) => item.ref_id}
				data={result}
				renderItem={renderer}
				showsVerticalScrollIndicator={false}
			/>
		</LinearGradientComp>
	);
};

export default SongSearch;
