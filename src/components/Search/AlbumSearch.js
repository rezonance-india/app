import React, {useState} from 'react';
import {FlatList, Text,View, Image, Dimensions,StyleSheet} from 'react-native';
import axios from 'axios';
import {apiUrl} from '../../constants/config';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBox from '../../components/Search/SearchBox';
import LinearGradientComp from '../Shared/LinearGradient';
import {colors} from '../../constants/colors';
import Type from '../Shared/Type';
import FillerContent from '../Shared/FillerContent';

const AlbumSearch = ({navigation}) => {
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [filler,setFiller] = useState(true);

	const renderer = ({item}) => {
		return (
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => {
					axios
						.post(
							`${apiUrl}fetch/tracks`,
							{
								album_id: item.album_id,
							},
							{
								headers: {
									'Content-Type': 'application/json',
								},
							},
						)
						.then((res) => {
							// console.log(res.data, 'data');
							const result = res.data.map((track) => ({
								...track,
								track_img: item.album_img,
								artist_name: item.artist_name,
								album_image:item.album_img
							}));
							console.log(result, 'data');
							navigation.navigate('ViewArtistScreen', {
								tracksData: result,
								album_image: item.album_img,
								artist_name: item.artist_name,
								album_name: item.album_name,
							});
						})
						.catch((err) => {
							console.log(err);
						});
				}}>
				<View style={{flexDirection: 'row', width: '100%'}}>
					<View
						style={{
							width: width / 7,
							height: width / 7,
							borderRadius: 1,
							marginVertical: 7,
							marginHorizontal: 10,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Image
							source={{
								uri: item.album_img,
							}}
							style={{
								width: 50,
								height: 50,
								borderRadius: 6,
								overflow: 'hidden',
							}}
						/>
					</View>

					<View
						style={{
							marginVertical: 10,
							marginHorizontal: 15,
							justifyContent: 'space-around',
							flex: 1,
						}}>
						<View
							style={{
								flexDirection: 'row',
								marginTop: 5,
								justifyContent: 'space-between',
								flex: 1,
								width: '100%',
							}}>
							<Type
								style={{
									fontSize: width / 24,
									width: '80%',
									color: colors.text,
									fontWeight: 'bold',
								}}>
								{item.album_name.length > 30
									? `${item.album_name.substring(0, 20)}....`
									: item.album_name}
							</Type>
						</View>

						<Type
							style={{
								fontSize: width / 26,
								color: '#D3D3D3',
							}}>
							{item.artist_name}
						</Type>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

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
					`${apiUrl}search/albums`,
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
						<FillerContent text={"No Search Results"} />
				):(
					filler ? (
						<>
						<FillerContent text={"Nothing to Search"} />
						</>
					):(
						<>
							<FlatList
								keyExtractor={(item) => item.album_id}
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


export default AlbumSearch;
