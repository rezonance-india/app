import React, {useState} from 'react';
import {ScrollView, FlatList, Text, View, TextInput} from 'react-native';
import ListItem from '../../components/Search/ListItem';
import ItemSeparator from '../../components/Shared/ItemSeperator';
import Header from '../../components/Shared/Header';
import Type from '../../components/Shared/Type';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import axios from 'axios';
import {apiUrl} from '../../constants/config';
import _ from 'lodash';
import {TRACKS} from '../../components/Player/tracksData';

import {
	TouchableHighlight,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import SearchBox from '../../components/Search/SearchBox';
import {useEffect} from 'react';

const SearchScreen = ({navigation}) => {
	const [value, setValue] = useState('');
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSong, setSelectedSong] = useState({});

	const renderer = ({item}) => (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => {
				console.log('lol');
				TRACKS[0] = {
					title: item.track_name,
					artist: item.artist_name,
					albumArtUrl: item.album_image,
					audioUrl: item.track_url,
				};
				navigation.navigate('PlayerScreen');

				setSelectedSong(item);
			}}>
			<ListItem
				navigation={navigation}
				selectedSong={selectedSong}
				data={item}
			/>
		</TouchableOpacity>
	);

	const search = _.debounce((value) => {
		if (value.length === 0) {
			setResult([]);
		}
		if (value.length !== 0) {
			console.log('in search');
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
					console.log(res.data);
					setResult(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, 500);

	const searchHeader = () => <Type>Search</Type>;

	return (
		<ScreenBuilder>
			<SearchBox
				searchQuery={searchQuery}
				setSearchQuery={search}
				navigation={navigation}
			/>

			<FlatList
				keyExtractor={(item) => item.ref_id}
				// ListHeaderComponent={searchHeader}
				data={result}
				renderItem={renderer}
				// ItemSeparatorComponent={ItemSeparator}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenBuilder>
	);
};

export default SearchScreen;
