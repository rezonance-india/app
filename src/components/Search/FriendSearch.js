import React, {useState} from 'react';
import {FlatList, View, Image, Dimensions} from 'react-native';
import axios from 'axios';
import {apiUrl, userApiUrl} from '../../constants/config';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBox from '../../components/Search/SearchBox';
import LinearGradientComp from '../Shared/LinearGradient';
import {colors} from '../../constants/colors';
import Type from '../Shared/Type';

const {width, height} = Dimensions.get('screen');

const FriendSearch = ({navigation}) => {
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const renderer = ({item}) => {
		return (
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => {
					navigation.navigate("ViewProfileScreen",{
                        item
                    })
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
								uri:item.photo 
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
								{item.username.length > 30
									? `${item.username.substring(0, 20)}....`
									: item.username}
							</Type>
						</View>

						<Type
							style={{
								fontSize: width / 26,
								color: '#D3D3D3',
							}}>
							{`${item.friends.length} friends`}
						</Type>
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
					`${userApiUrl}/friends/getAllUsers`,
					{
						name: value,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				)
				.then((res) => {
                    console.log(res.data,"data");
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
					placeholder="Search Your Future Friends"
					searchQuery={searchQuery}
					setSearchQuery={search}
					navigation={navigation}
				/>
			</View>
			<FlatList
				keyExtractor={(item) => item._id}
				data={result}
				renderItem={renderer}
				showsVerticalScrollIndicator={false}
			/>
		</LinearGradientComp>
	);
};

export default FriendSearch;
