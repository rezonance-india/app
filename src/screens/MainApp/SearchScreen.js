import React, {useState} from 'react';
import {ScrollView, FlatList, Text, View, TextInput} from 'react-native';
import ListItem from '../../components/Shared/ListItem';
import ItemSeparator from '../../components/Shared/ItemSeperator';
import Header from '../../components/Shared/Header';
import Type from '../../components/Shared/Type';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import axios from 'axios';
import {apiUrl} from '../../constants/config';

import {
	TouchableHighlight,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native-gesture-handler';

const SearchScreen = ({navigation}) => {
	const [value, setValue] = useState('');
	const [result, setResult] = useState([]);

	const renderer = ({item}) => (
		<TouchableOpacity activeOpacity={0.75} onPress={null}>
			<ListItem navigation={navigation} data={item} />
		</TouchableOpacity>
	);

	const fetchSongs = (text) => {
		setValue(text);
		if (text.length > 3 && text.value !== 0) {
			axios
				.post(
					`${apiUrl}search`,
					{
						query: text,
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
	};

	const searchHeader = () => <Type>Search</Type>;
	return (
		<ScreenBuilder>
			<TextInput
				style={{
					backgroundColor: 'white',
				}}
				onChangeText={(text) => fetchSongs(text)}
				value={value}
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
