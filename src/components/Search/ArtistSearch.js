import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, FlatList, Text, View, TextInput, Image} from 'react-native';
import axios from 'axios';
import {apiUrl} from '../../constants/config';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBox from '../../components/Search/SearchBox';
import LinearGradientComp from '../Shared/LinearGradient';
import {colors} from '../../constants/colors';

const ArtistSearch = ({navigation}) => {
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	//Renderer function
	const renderer = ({item}) => {
		const viewArtist = () => {
			//Fetching all albums of the particular artist
			//Parameter as artist_id
			axios
				.post(
					`${apiUrl}fetch/albums`,
					{
						artist_id: item.artist_id,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				)
				.then((res) => {
					navigation.navigate('ViewArtistScreen', {
						albumData: res.data,
						artist_id: item.artist_id,
						artist_image: item.artist_image,
						artist_name: item.artist_name,
					});
				})
				.catch((err) => {
					console.log(err);
				});
			// console.log('ok');
		};
		return (
			<TouchableOpacity onPress={viewArtist}>
				<View
					style={{
						flexDirection: 'column',
						marginVertical: 10,
						marginHorizontal: 20,
					}}>
					<Image
						source={{uri: item.artist_image}}
						style={{
							borderRadius: 100,
							borderColor: 'rgba(0,0,0,0.3)',
							borderWidth: 3,
							width: 150,
							height: 150,
						}}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
						}}>
						<Text
							style={{
								color: 'white',
								fontFamily: 'IBMPlexSans',
								marginVertical: 20,
								fontSize: 18,
								fontWeight: 'bold',
								letterSpacing: 0.4,
							}}>
							{item.artist_name}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const search = _.debounce((value) => {
		console.log(value, 'value');
		if (value.length === 0) {
			console.log('empty');
			setResult([]);
		}
		if (value.length !== 0) {
			axios
				.post(
					`${apiUrl}search/artists`,
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
				keyExtractor={(item) => item.artist_id}
				data={result}
				renderItem={renderer}
				numColumns={2}
				showsVerticalScrollIndicator={false}
			/>
		</LinearGradientComp>
	);
};

export default ArtistSearch;
