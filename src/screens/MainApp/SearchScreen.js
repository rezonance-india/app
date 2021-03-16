import React, {useState} from 'react';
import {ScrollView, FlatList, Text, View, TextInput} from 'react-native';
import ListItem from '../../components/Shared/ListItem';
import ItemSeparator from '../../components/Shared/ItemSeperator';
import Header from '../../components/Shared/Header';
import Type from '../../components/Shared/Type';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import axios from 'axios';
import {apiUrl} from '../../constants/config';
import _ from 'lodash';

import {
	TouchableHighlight,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import SearchBox from '../../components/Shared/SearchBox';
import {useEffect} from 'react';

const SearchScreen = ({navigation}) => {
	const [value, setValue] = useState('');
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	const renderer = ({item}) => (
		<TouchableOpacity activeOpacity={0.75} onPress={null}>
			<ListItem navigation={navigation} data={item} />
		</TouchableOpacity>
	);

	useEffect(() => {
		// const debounceFunction = (func, delay) => {
		// 	console.log(timerId);
		// 	timerId ? clearTimeout(timerId) : '';
		// 	timerId = setTimeout(func, delay);
		// 	console.log(timerId, 'after setting');
		// };
		// debounceFunction(fetchSongs, 6000);
		const debouncedFunction = _.debounce(fetchSongs, 2000);
		debouncedFunction();
	}, [searchQuery]);

	const fetchSongs = () => {
		// setValue(text);
		console.log('in fetchSongs', searchQuery);
		axios
			.post(
				`${apiUrl}search/tracks`,
				{
					query: searchQuery,
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
	};

	const searchHeader = () => <Type>Search</Type>;

	return (
		<ScreenBuilder>
			{/* <TextInput
				style={{
					backgroundColor: 'white',
				}}
				onChangeText={(text) => fetchSongs(text)}
				value={value}
			/> */}
			<SearchBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				navigation={navigation}
			/>

			{/* <Header isBack heading="Search" navigation={navigation} /> */}
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
